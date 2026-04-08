package com.example.miniint.http;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.circuitbreaker.CallNotPermittedException;

import java.io.InputStream;
import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.concurrent.Executor;

public final class HttpUpstreamClient {
    private final String baseUrl;
    private final HttpClient client;
    private final Duration timeout;
    //private final CircuitBreaker circuitBreaker;

    public HttpUpstreamClient(String baseUrl, int timeoutMs) {
        this(baseUrl, timeoutMs, null);
    }

    public HttpUpstreamClient(String baseUrl, int timeoutMs, Executor executor) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        this.timeout = Duration.ofMillis(timeoutMs);
        HttpClient.Builder builder = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(this.timeout);
        if (executor != null) {
            builder.executor(executor);
        }
        this.client = builder.build();
        
        // Configure circuit breaker
        // CircuitBreakerConfig config = CircuitBreakerConfig.custom()
        //         .failureRateThreshold(50.0f)  // Open after 50% failures
        //         .slowCallRateThreshold(80.0f)  // Open if 80% of calls exceed slowThreshold
        //         .slowCallDurationThreshold(Duration.ofSeconds(900))  // 10 seconds is slow
        //         .waitDurationInOpenState(Duration.ofSeconds(3))  // Wait 30s before retry
        //         .permittedNumberOfCallsInHalfOpenState(5)  // Allow 5 calls in half-open
        //         .minimumNumberOfCalls(4000)  // Need at least 10 calls before evaluating
        //         .build();
        // this.circuitBreaker = CircuitBreaker.of("upstream", config);
    }

    public HttpResponse<InputStream> forward(String method, String pathAndQuery, InputStream body) throws Exception {
        try {
            // Wrap with circuit breaker
             try {
                    return forwardInternal(method, pathAndQuery, body);
                } catch (Exception e) {
                    // Wrap checked exceptions in an unchecked exception so the Supplier can throw
                    throw new RuntimeException(e);
                }
            // return circuitBreaker.executeSupplier(() -> {
            //     try {
            //         return forwardInternal(method, pathAndQuery, body);
            //     } catch (Exception e) {
            //         // Wrap checked exceptions in an unchecked exception so the Supplier can throw
            //         throw new RuntimeException(e);
            //     }
            // });
        } catch (CallNotPermittedException e) {
            // Re-throw circuit breaker exceptions
            throw e;
        } catch (RuntimeException e) {
            // Unwrap original exception
            if (e.getCause() instanceof Exception) {
                throw (Exception) e.getCause();
            }
            throw e;
        }
    }
    
    private HttpResponse<InputStream> forwardInternal(String method, String pathAndQuery, InputStream body) throws Exception {
        URI uri = URI.create(baseUrl + pathAndQuery);

        HttpRequest.BodyPublisher pub = (body == null)
                ? HttpRequest.BodyPublishers.noBody()
                : HttpRequest.BodyPublishers.ofInputStream(() -> body);

        HttpRequest req = HttpRequest.newBuilder()
                .uri(uri)
                .timeout(timeout)
                .method(method, pub)
                .build();

        return client.send(req, HttpResponse.BodyHandlers.ofInputStream());
    }
}