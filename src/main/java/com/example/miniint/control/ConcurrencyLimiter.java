package com.example.miniint.control;

import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterConfig;

import java.time.Duration;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

public final class ConcurrencyLimiter {
    private final Semaphore sem;
    private final int acquireTimeoutMs;
    private final RateLimiter rateLimiter;

    public ConcurrencyLimiter(int maxInFlight, int acquireTimeoutMs, int requestsPerSecond) {
        if (maxInFlight <= 0) throw new IllegalArgumentException("maxInFlight must be > 0");
        this.sem = new Semaphore(maxInFlight);
        this.acquireTimeoutMs = acquireTimeoutMs;

        // Configure Token Bucket Rate Limiter
        // This allows requestsPerSecond tokens per second
        RateLimiterConfig config = RateLimiterConfig.custom()
                .limitRefreshPeriod(Duration.ofSeconds(1))
                .limitForPeriod(requestsPerSecond)
                .timeoutDuration(Duration.ofSeconds(0))  // Long timeout - wait for token
                .build();
        this.rateLimiter = RateLimiter.of("proxy-rate-limiter", config);
    }

    public Permit tryAcquire() throws InterruptedException {
        // Execute operation under rate limit - this will wait for token availability
        // If timeout is exceeded during waiting, it throws RequestNotPermitted
        try {
            rateLimiter.executeSupplier(() -> {
                // Check concurrency limit while holding rate limit permission
                try {
                    boolean ok = sem.tryAcquire(acquireTimeoutMs, TimeUnit.MILLISECONDS);
                    if (!ok) {
                        throw new IllegalStateException("Failed to acquire semaphore");
                    }
                    return true;
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException(e);
                }
            });
            return new Permit(sem);
        } catch (Exception e) {
            // Rate limit exceeded or semaphore timeout
            return null;
        }
    }


    // to ensure semaphore is always released
    public static final class Permit implements AutoCloseable {
        private final Semaphore sem;
        private boolean released;

        private Permit(Semaphore sem) { this.sem = sem; }

        @Override
        public void close() {
            if (!released) {
                released = true;
                sem.release();
            }
        }
    }
}