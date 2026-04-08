package com.example.miniint.mq;

import com.example.miniint.config.AppConfig;
import com.example.miniint.config.AppConfig.RoutingStrategy;
import com.rabbitmq.client.AMQP;

import com.sun.net.httpserver.Headers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicInteger;

public final class RabbitMqPublisher implements AutoCloseable {
    private final RabbitMqChannelPool channelPool;
    private final String exchange;
    private final List<String> routingKeys;
    private final RoutingStrategy routingStrategy;
    private final AtomicInteger roundRobin = new AtomicInteger();
    private final int confirmTimeoutMs;
    private final int maxBodyBytes;

    public RabbitMqPublisher(AppConfig cfg) throws Exception {
        this.channelPool = new RabbitMqChannelPool(cfg.amqpUri(), cfg.channelPoolSize());
        this.exchange = cfg.exchange();
        this.routingKeys = cfg.routingKeys().isEmpty()
                ? List.of("")
                : List.copyOf(cfg.routingKeys());
        this.routingStrategy = cfg.routingStrategy();
        this.confirmTimeoutMs = cfg.confirmTimeoutMs();
        this.maxBodyBytes = cfg.maxBodyBytes();
    }

    public void publish(String method, String path, Headers headers, InputStream body, long acquireTimeoutMs) throws Exception {
        try (RabbitMqChannelPool.Lease lease = channelPool.borrow(acquireTimeoutMs)) {
            if (lease == null) {
                throw new ChannelUnavailableException("All RabbitMQ channels are busy");
            }

            byte[] payload = toByteArray(body);
            String routingKey = pickRoutingKey(path);
            AMQP.BasicProperties props = buildProperties(method, path, headers);

            long seqNo = lease.publish(exchange, routingKey, props, payload);
            CompletableFuture<Void> confirmFuture = lease.register(seqNo);
            try {
                confirmFuture.get(confirmTimeoutMs, TimeUnit.MILLISECONDS);
            } catch (TimeoutException timeout) {
                confirmFuture.cancel(true);
                throw new IOException("Timed out waiting for broker confirm", timeout);
            }
        }
    }

    private String pickRoutingKey(String path) {
        if (routingKeys.size() == 1) {
            return routingKeys.get(0);
        }
        return switch (routingStrategy) {
            case HASH_PATH -> routingKeys.get(Math.floorMod(Objects.requireNonNullElse(path, "").hashCode(), routingKeys.size()));
            case ROUND_ROBIN -> routingKeys.get(Math.floorMod(roundRobin.getAndIncrement(), routingKeys.size()));
        };
    }

    private AMQP.BasicProperties buildProperties(String method, String path, Headers headers) {
        Map<String, Object> amqpHeaders = new HashMap<>();
        amqpHeaders.put("httpMethod", method);
        amqpHeaders.put("httpPath", path);
        amqpHeaders.put("receivedAt", Instant.now().toString());
        amqpHeaders.put("retryCount", 0);
        headers.forEach((key, values) -> amqpHeaders.put("http." + key, String.join(",", values)));

        return new AMQP.BasicProperties.Builder()
                .contentType(headers.getFirst("Content-Type"))
                .contentEncoding(headers.getFirst("Content-Encoding"))
                .deliveryMode(2)
                .headers(amqpHeaders)
                .build();
    }

    private byte[] toByteArray(InputStream body) throws IOException {
        if (body == null) {
            return new byte[0];
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buffer = new byte[8192];
        int read;
        int total = 0;
        while ((read = body.read(buffer)) != -1) {
            total += read;
            if (total > maxBodyBytes) {
                throw new IOException("Request body exceeds MAX_BODY_BYTES=" + maxBodyBytes);
            }
            out.write(buffer, 0, read);
        }
        return out.toByteArray();
    }

    @Override
    public void close() throws Exception {
        channelPool.close();
    }

    public static final class ChannelUnavailableException extends Exception {
        public ChannelUnavailableException(String message) {
            super(message);
        }
    }
}
