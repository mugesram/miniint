package com.example.miniint;

import com.example.miniint.config.AppConfig;
import com.example.miniint.control.ConcurrencyLimiter;
import com.example.miniint.http.HttpUpstreamClient;
import com.example.miniint.mq.RabbitMqConsumerTask;
import com.example.miniint.mq.RabbitMqChannelPool;


import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public final class ConsumerApp {
    private ConsumerApp() {}

    public static void main(String[] args) throws Exception {
        AppConfig cfg = AppConfig.fromEnvAndArgs(args);

        ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
        ConcurrencyLimiter limiter = new ConcurrencyLimiter(cfg.maxInFlight(), cfg.acquireTimeoutMs(), cfg.requestsPerSecond());
        HttpUpstreamClient upstream = new HttpUpstreamClient(cfg.upstreamBaseUrl(), cfg.requestTimeoutMs(), executor);
        RabbitMqChannelPool consumerPool = new RabbitMqChannelPool(cfg.amqpUri(), cfg.channelPoolSize(), cfg.consumerPrefetch(), false);
        RabbitMqConsumerTask consumer = new RabbitMqConsumerTask(cfg, limiter, upstream, executor, consumerPool);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                consumer.close();
                consumerPool.close();
            } catch (Exception ignored) { }
            executor.shutdown();
        }));

        consumer.start();
        System.out.println("RabbitMQ consumer started. Press Ctrl+C to stop.");

        CountDownLatch latch = new CountDownLatch(1);
        try {
            latch.await();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
