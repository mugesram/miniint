package com.example.miniint;

import com.example.miniint.config.AppConfig;
import com.example.miniint.control.ConcurrencyLimiter;
import com.example.miniint.http.ProxyServer;


import java.util.concurrent.Executors;

public final class App {
    public static void main(String[] args) throws Exception {
        AppConfig cfg = AppConfig.fromEnvAndArgs(args);

        var vthreadExecutor = Executors.newVirtualThreadPerTaskExecutor();
        var limiter = new ConcurrencyLimiter(cfg.maxInFlight(), cfg.acquireTimeoutMs(), cfg.requestsPerSecond());

        ProxyServer server = switch (cfg.mode()) {
            case HTTP_PROXY -> ProxyServer.httpProxy(cfg, limiter, vthreadExecutor);
            case HTTP_TO_MQ -> ProxyServer.httpToMq(cfg, limiter, vthreadExecutor);
        };
        server.start();
    }
}