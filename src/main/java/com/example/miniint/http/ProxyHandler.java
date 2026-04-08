package com.example.miniint.http;

import com.example.miniint.control.ConcurrencyLimiter;
import com.example.miniint.mq.RabbitMqPublisher;
import io.github.resilience4j.circuitbreaker.CallNotPermittedException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public final class ProxyHandler {

    public static final class ProxyToHttp implements HttpHandler {
        private final HttpUpstreamClient upstream;
        private final ConcurrencyLimiter limiter;

        public ProxyToHttp(HttpUpstreamClient upstream, ConcurrencyLimiter limiter) {
            this.upstream = upstream;
            this.limiter = limiter;
        }

        @Override
        public void handle(HttpExchange ex) {
            try (var permit = limiter.tryAcquire()) {
                // if (permit == null) {
                //     respond(ex, 429, "Too Many Requests"); // Rate or concurrency limit exceeded
                //     return;
                // }

                String method = ex.getRequestMethod();
                String pathAndQuery = ex.getRequestURI().toString();

                InputStream reqBody = ex.getRequestBody();
                var resp = upstream.forward(method, pathAndQuery, reqBody);

                // Copy upstream status + stream body back
                ex.getResponseHeaders().set("Content-Type",
                        resp.headers().firstValue("Content-Type").orElse("application/octet-stream"));

                ex.sendResponseHeaders(resp.statusCode(), 0); // 0 => chunked

                // Transfer upstream body to client and close streams
                try (InputStream upstreamBody = resp.body(); OutputStream out = ex.getResponseBody()) {
                    upstreamBody.transferTo(out);
                }
            } catch (CallNotPermittedException e) {
                safeRespond(ex, 503, "Circuit breaker open");
            } catch (Exception e) {

                safeRespond(ex, 502, e.getMessage() + " - " + e.getClass().getSimpleName());
                
            } finally {
                ex.close();
            }
        }
    }


    public static final class HttpToMq implements HttpHandler {
        private final RabbitMqPublisher publisher;
        private final ConcurrencyLimiter limiter;
        private final long channelAcquireTimeoutMs;

        public HttpToMq(RabbitMqPublisher publisher, ConcurrencyLimiter limiter, long channelAcquireTimeoutMs) {
            this.publisher = publisher;
            this.limiter = limiter;
            this.channelAcquireTimeoutMs = channelAcquireTimeoutMs;
        }

        @Override
        public void handle(HttpExchange ex) {
            try (var permit = limiter.tryAcquire()) {
                if (permit == null) {
                    respond(ex, 429, "Too Many Requests");
                    return;
                }

                String method = ex.getRequestMethod();
                String pathAndQuery = ex.getRequestURI().toString();

                publisher.publish(method, pathAndQuery, ex.getRequestHeaders(), ex.getRequestBody(), channelAcquireTimeoutMs);
                respond(ex, 202, "Accepted - Message queued\n");
            } catch (RabbitMqPublisher.ChannelUnavailableException channelBusy) {
                safeRespond(ex, 429, "Too Many Requests - MQ channel pool exhausted");
            } catch (InterruptedException interrupted) {
                Thread.currentThread().interrupt();
                safeRespond(ex, 500, "Interrupted while publishing to RabbitMQ");
            } catch (Exception e) {
                safeRespond(ex, 500, "Failed to enqueue: " + e.getMessage());
            } finally {
                ex.close();
            }
        }
    }


    private static void respond(HttpExchange ex, int code, String msg) throws Exception {
        byte[] b = msg.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().set("Content-Type", "text/plain; charset=utf-8");
        ex.sendResponseHeaders(code, b.length);
        try (OutputStream os = ex.getResponseBody()) { os.write(b); }
    }

    private static void safeRespond(HttpExchange ex, int code, String msg) {
        try { respond(ex, code, msg); } catch (Exception ignored) {}
    }
}