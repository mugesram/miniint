package com.example.miniint.http;

import com.example.miniint.config.AppConfig;
import com.example.miniint.control.ConcurrencyLimiter;
import com.example.miniint.mq.RabbitMqPublisher;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.util.concurrent.Executor;

public final class ProxyServer {
    private final HttpServer server;
    private final AutoCloseable closeHook;

    private ProxyServer(HttpServer server, AutoCloseable closeHook) {
        this.server = server;
        this.closeHook = closeHook;
    }

    public static ProxyServer httpProxy(AppConfig cfg, ConcurrencyLimiter limiter, Executor exec) throws Exception {
        HttpServer s = HttpServer.create(new InetSocketAddress(cfg.listenHost(), cfg.listenPort()), 0);
        var upstream = new HttpUpstreamClient(cfg.upstreamBaseUrl(), cfg.requestTimeoutMs(), exec);
        s.createContext("/", new ProxyHandler.ProxyToHttp(upstream, limiter));
        s.setExecutor(exec);
        return new ProxyServer(s, null);
    }

    public static ProxyServer httpToMq(AppConfig cfg, ConcurrencyLimiter limiter, Executor exec) throws Exception {
        HttpServer s = HttpServer.create(new InetSocketAddress(cfg.listenHost(), cfg.listenPort()), 0);
        RabbitMqPublisher publisher = new RabbitMqPublisher(cfg);
        s.createContext("/", new ProxyHandler.HttpToMq(publisher, limiter, cfg.acquireTimeoutMs()));
        s.setExecutor(exec);
        return new ProxyServer(s, publisher);
    }

    public void start() {
        server.start();
        System.out.printf("Listening on %s%n", server.getAddress());
    }

    public void stop() {
        server.stop(0);
        if (closeHook != null) {
            try {
                closeHook.close();
            } catch (Exception e) {
                System.err.println("Error closing resources: " + e.getMessage());
            }
        }
    }
}
