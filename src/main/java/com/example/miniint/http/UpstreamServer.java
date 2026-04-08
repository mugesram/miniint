package com.example.miniint.http;

import com.github.tomakehurst.wiremock.WireMockServer;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.options;

public final class UpstreamServer {

    public static void main(String[] args) {

        int port = 9000;

        WireMockServer server = new WireMockServer(
                options()
                        .bindAddress("0.0.0.0")
                        .port(port)
        );

        server.start();
        configureFor("localhost", port);
        server.addMockServiceRequestListener((request, response) ->
                System.out.printf("[UPSTREAM] %s %s%n", request.getMethod(), request.getUrl())
        );

        /* ---------------- GET ---------------- */

        stubFor(get(urlMatching("/.*"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withFixedDelay(2000) // simulate processing delay
                        .withHeader("Content-Type", "application/json; charset=utf-8")
                        .withBody("{\"body\":\"api1\"}")
                ));

        /* ---------------- POST ---------------- */

        stubFor(post(urlMatching("/.*"))
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "text/plain; charset=utf-8")
                        .withBody("POST OK {{request.url}}, received {{request.body.length}} bytes\n")
                        .withTransformers("response-template")
                ));

        /* ---------------- Method Not Allowed ---------------- */

        stubFor(any(urlMatching("/.*"))
               .atPriority(10)
                .willReturn(aResponse()
                        .withStatus(405)
                        .withBody("Method Not Allowed\n")
                ));

        System.out.println("WireMock upstream server running on port " + port);
    }
}
