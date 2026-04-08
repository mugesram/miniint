package com.example.miniint.config;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record AppConfig(
        Mode mode,
        String listenHost,
        int listenPort,
        String upstreamBaseUrl,
        int requestTimeoutMs,
        int maxInFlight,
        int acquireTimeoutMs,
        int requestsPerSecond,
        String amqpUri,
        String exchange,
        List<String> routingKeys,
        RoutingStrategy routingStrategy,
        int channelPoolSize,
        int confirmTimeoutMs,
        int maxBodyBytes,
        List<String> consumeQueues,
        int consumerPollIntervalMs,
        int consumerPrefetch,
        int consumerMaxRetries,
        int consumerBaseBackoffMs,
        int consumerMaxBackoffMs,
        String deadLetterQueue
) {

    public enum Mode { HTTP_PROXY, HTTP_TO_MQ }

    public enum RoutingStrategy { ROUND_ROBIN, HASH_PATH }

    public static AppConfig fromEnvAndArgs(String[] args) {
        Map<String, String> env = System.getenv();

        Mode mode = Mode.valueOf(env.getOrDefault("MODE", "HTTP_PROXY"));

        String host = env.getOrDefault("LISTEN_HOST", "0.0.0.0");
        int port = Integer.parseInt(env.getOrDefault("LISTEN_PORT", "8080"));

        String upstream = env.getOrDefault("UPSTREAM_BASE_URL", "http://localhost:9000");
        int reqTimeout = Integer.parseInt(env.getOrDefault("REQUEST_TIMEOUT_MS", "30000"));

        int maxInFlight = Integer.parseInt(env.getOrDefault("MAX_IN_FLIGHT", "100"));
        int acquireTimeout = Integer.parseInt(env.getOrDefault("ACQUIRE_TIMEOUT_MS", "50"));
        int requestsPerSec = Integer.parseInt(env.getOrDefault("REQUESTS_PER_SECOND", "10"));

        String amqp = env.getOrDefault("AMQP_URI", "amqp://guest:guest@localhost:5672/");
        String exchange = env.getOrDefault("AMQP_EXCHANGE", "proxy.exchange");
        List<String> routingKeys = parseList(env.getOrDefault("ROUTING_KEYS",
                env.getOrDefault("ROUTING_KEY", "proxy.messages")));
        RoutingStrategy strategy = RoutingStrategy.valueOf(env.getOrDefault("ROUTING_STRATEGY", "ROUND_ROBIN"));
        int channelPoolSize = Integer.parseInt(env.getOrDefault("CHANNEL_POOL_SIZE", "200"));
        int confirmTimeoutMs = Integer.parseInt(env.getOrDefault("CONFIRM_TIMEOUT_MS", "5000"));
        int maxBodyBytes = Integer.parseInt(env.getOrDefault("MAX_BODY_BYTES", "1048576"));

        List<String> consumeQueues = parseList(env.getOrDefault("CONSUME_QUEUES", String.join(",", routingKeys)));
        int pollInterval = Integer.parseInt(env.getOrDefault("CONSUMER_POLL_INTERVAL_MS", "10000"));
        int consumerPrefetch = Integer.parseInt(env.getOrDefault("CONSUMER_PREFETCH", "25"));
        int consumerMaxRetries = Integer.parseInt(env.getOrDefault("CONSUMER_MAX_RETRIES", "5"));
        int consumerBaseBackoff = Integer.parseInt(env.getOrDefault("CONSUMER_BASE_BACKOFF_MS", "500"));
        int consumerMaxBackoff = Integer.parseInt(env.getOrDefault("CONSUMER_MAX_BACKOFF_MS", "10000"));
        String deadLetterQueue = env.getOrDefault("DEAD_LETTER_QUEUE", "proxy.dlq");

        return new AppConfig(mode, host, port, upstream, reqTimeout, maxInFlight, acquireTimeout, requestsPerSec,
                amqp, exchange, routingKeys, strategy, channelPoolSize, confirmTimeoutMs, maxBodyBytes,
                consumeQueues, pollInterval, consumerPrefetch, consumerMaxRetries, consumerBaseBackoff,
                consumerMaxBackoff, deadLetterQueue);
    }

    private static List<String> parseList(String raw) {
        if (raw == null || raw.isBlank()) {
            return List.of();
        }
        return Arrays.stream(raw.split(","))
                .map(String::trim)
                .filter(v -> !v.isEmpty())
                .collect(Collectors.collectingAndThen(Collectors.toList(), List::copyOf));
    }
}