package com.example.miniint.mq;

import com.example.miniint.config.AppConfig;
import com.example.miniint.control.ConcurrencyLimiter;
import com.example.miniint.http.HttpUpstreamClient;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Envelope;
import com.rabbitmq.client.GetResponse;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicBoolean;

public final class RabbitMqConsumerTask implements AutoCloseable {
    private final AppConfig cfg;
    private final ConcurrencyLimiter limiter;
    private final HttpUpstreamClient upstream;
    private final Executor executor;
    private final RabbitMqChannelPool channelPool;
    private final AtomicBoolean running = new AtomicBoolean(false);

    public RabbitMqConsumerTask(AppConfig cfg,
                                ConcurrencyLimiter limiter,
                                HttpUpstreamClient upstream,
                                Executor executor,
                                RabbitMqChannelPool channelPool) throws Exception {
        this.cfg = cfg;
        this.limiter = limiter;
        this.upstream = upstream;
        this.executor = executor;
        this.channelPool = channelPool;
    }

    public void start() {
        if (running.compareAndSet(false, true)) {
            executor.execute(this::runLoop);
        }
    }

    private void runLoop() {
        while (running.get()) {
            try {
                boolean processed = drainQueues();
                if (!processed) {
                    Thread.sleep(cfg.consumerPollIntervalMs());
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            } catch (Exception e) {
                System.err.println("[RabbitMqConsumer] Error: " + e.getMessage());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }
    }

    /**
     * Drain queues using round-robin (fair scheduling) with parallel message processing.
     * Processes one message from each queue in turn, then submits each to the virtual-thread executor
     * for parallel HTTP forwarding. This prevents high-volume queues from starving lower-volume queues
     * while enabling concurrent upstream requests.
     */
    private boolean drainQueues() throws Exception {
        boolean handled = false;
        List<String> queues = new java.util.ArrayList<>(cfg.consumeQueues());
        
        while (running.get() && !queues.isEmpty()) {
            boolean processedInRound = false;
            
            for (String queue : queues) {
                if (!running.get()) {
                    break;
                }
                
                RabbitMqChannelPool.Lease lease = channelPool.borrow(cfg.acquireTimeoutMs());
                if (lease == null) {
                    continue;
                }

                Channel ch = lease.channel();
                GetResponse delivery = ch.basicGet(queue, false);

                if (delivery != null) {
                    handled = true;
                    processedInRound = true;
                    executor.execute(() -> {
                        try {
                            handleDelivery(queue, delivery, lease);
                        } catch (Exception e) {
                            lease.markBroken();
                            System.err.println("[RabbitMqConsumer] Async delivery handling failed: " + e.getMessage());
                        } finally {
                            lease.close();
                        }
                    });
                } else {
                    lease.close();
                }
            }
            
            // If no queue had messages in this round, all queues are empty
            if (!processedInRound) {
                break;
            }
        }
        return handled;
    }

    private void handleDelivery(String queue, GetResponse delivery, RabbitMqChannelPool.Lease lease) throws Exception {
        Channel ch = lease.channel();
        Envelope env = delivery.getEnvelope();
        long tag = env.getDeliveryTag();

        try (var permit = limiter.tryAcquire()) {
            if (permit == null) {
                ch.basicNack(tag, false, true);
                return;
            }
        
            if (forwardToHttp(delivery)) {
                ch.basicAck(tag, false);
            } else {
                retryOrDeadLetter(queue, delivery, tag, ch);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            ch.basicNack(tag, false, true);
        } catch (Exception e) {
            System.err.println("[RabbitMqConsumer] Forwarding failed: " + e.getMessage());
            lease.markBroken();
            retryOrDeadLetter(queue, delivery, tag, ch);
        }
    }

    private boolean forwardToHttp(GetResponse delivery) throws Exception {
        AMQP.BasicProperties props = delivery.getProps();
        Map<String, Object> headers = props.getHeaders();
        String method = headerString(headers, "httpMethod", "POST");
        String path = headerString(headers, "httpPath", "/");

        try (InputStream body = new ByteArrayInputStream(delivery.getBody())) {
            System.out.println("[RabbitMqConsumer] Forwarding to HTTP: " + method + " " + path);
            var response = upstream.forward(method, path, body);
            try (InputStream upstreamBody = response.body()) {
                upstreamBody.readAllBytes();
            }
            int status = response.statusCode();
            return status >= 200 && status < 300;
        }
    }

    private void retryOrDeadLetter(String queue, GetResponse delivery, long tag, Channel ch) throws Exception {
        AMQP.BasicProperties props = delivery.getProps();
        Map<String, Object> headers = props.getHeaders();
        int retries = headerInt(headers, "retryCount", 0);
        int nextRetry = retries + 1;

        try {
            if (nextRetry <= cfg.consumerMaxRetries()) {
                long delay = computeDelay(nextRetry);
                Thread.sleep(delay);

                Map<String, Object> newHeaders = headers == null ? new HashMap<>() : new HashMap<>(headers);
                newHeaders.put("retryCount", nextRetry);
                AMQP.BasicProperties newProps = props.builder().headers(newHeaders).build();
                ch.basicPublish("", queue, true, false, newProps, delivery.getBody());
            } else {
                ch.basicPublish("", cfg.deadLetterQueue(), true, false, props, delivery.getBody());
            }
            ch.basicAck(tag, false);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            ch.basicNack(tag, false, true);
        }
    }

    private long computeDelay(int attempt) {
        long delay = (long) cfg.consumerBaseBackoffMs() * (1L << (attempt - 1));
        return Math.min(delay, cfg.consumerMaxBackoffMs());
    }

    private String headerString(Map<String, Object> headers, String key, String defaultValue) {
        if (headers == null) {
            return defaultValue;
        }
        Object value = headers.get(key);
        return value == null ? defaultValue : Objects.toString(value, defaultValue);
    }

    private int headerInt(Map<String, Object> headers, String key, int defaultValue) {
        if (headers == null) {
            return defaultValue;
        }
        Object value = headers.get(key);
        if (value instanceof Number number) {
            return number.intValue();
        }
        if (value instanceof String str) {
            try {
                return Integer.parseInt(str);
            } catch (NumberFormatException ignored) { }
        }
        return defaultValue;
    }

    @Override
    public void close() {
        running.set(false);
        try {
            channelPool.close();
        } catch (Exception ignored) { }
    }
}
