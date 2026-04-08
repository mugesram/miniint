# miniint

A lightweight, high-throughput HTTP proxy and message-queue bridge built on Java 21 virtual threads. Designed to be dropped in front of any HTTP service to add rate limiting, concurrency control, and optional RabbitMQ-backed buffering — with zero external framework dependencies.

---

## Architecture

![HTTP Proxy to RabbitMQ Flow](diagrams/HTTP%20Proxy%20to%20RabbitMQ%20Flow.png)

---

## Modes

miniint runs in one of two modes controlled by the `MODE` environment variable.

### `HTTP_PROXY` (default)

Acts as a transparent reverse proxy. Incoming HTTP requests are forwarded directly to the configured upstream, with concurrency and rate-limit guards applied. Circuit-breaker support is built in (disabled by default; see `HttpUpstreamClient`).

```
Client → miniint (rate limit + concurrency) → Upstream HTTP Server
```

### `HTTP_TO_MQ`

Accepts HTTP requests and publishes them durably to RabbitMQ instead of forwarding them inline. A separate consumer process (`ConsumerApp`) drains the queues and forwards messages to the upstream, enabling request buffering, backpressure, and retry with dead-lettering.

```
Client → miniint (rate limit + concurrency) → RabbitMQ Exchange → Queue(s)
                                                                        ↓
                                                             ConsumerApp → Upstream HTTP Server
```

---

## Key Components

| Component | Description |
|---|---|
| `ProxyServer` | Embedded `com.sun.net.httpserver` listener; dispatches to the appropriate handler |
| `ProxyHandler.ProxyToHttp` | Streams request/response bytes between client and upstream |
| `ProxyHandler.HttpToMq` | Reads request body, publishes to RabbitMQ, returns `202 Accepted` immediately |
| `ConcurrencyLimiter` | Semaphore (max-in-flight) + Resilience4j token-bucket rate limiter |
| `HttpUpstreamClient` | Java `HttpClient` wrapper; circuit-breaker hook is prepared but togglable |
| `RabbitMqPublisher` | Publishes with mandatory flag and waits for broker publisher confirms |
| `RabbitMqChannelPool` | Bounded pool of AMQP channels over a single long-lived connection; self-heals on channel shutdown |
| `RabbitMqConsumerTask` | Round-robin queue drainer; submits each delivery to a virtual-thread executor for parallel forwarding |

---

## RabbitMQ Channel Pool

![RabbitMQ Channel Pool](diagrams/Rabbit%20Mq%20POOL.png)

Channels are borrowed from a bounded `ArrayBlockingQueue`. After publish, a channel is returned to the pool immediately — before the broker confirm arrives — so the pool can serve other requests concurrently. If a channel fails, the pool tracks the deficit and creates a replacement on the next borrow call.

---

## Consumer Flow

![Consumer](diagrams/consumer.png)

The consumer uses a fair round-robin drain across all configured queues so that no single high-volume queue starves the others. Failed deliveries are retried with exponential back-off up to `CONSUMER_MAX_RETRIES`; after that they are moved to the dead-letter queue.

---

## Configuration

All settings are read from environment variables. Defaults are shown below.

### General

| Variable | Default | Description |
|---|---|---|
| `MODE` | `HTTP_PROXY` | `HTTP_PROXY` or `HTTP_TO_MQ` |
| `LISTEN_HOST` | `0.0.0.0` | Bind address |
| `LISTEN_PORT` | `8080` | Listen port |
| `UPSTREAM_BASE_URL` | `http://localhost:9000` | Target upstream base URL |
| `REQUEST_TIMEOUT_MS` | `30000` | HTTP upstream request timeout |

### Concurrency & Rate Limiting

| Variable | Default | Description |
|---|---|---|
| `MAX_IN_FLIGHT` | `100` | Maximum concurrent requests (semaphore permits) |
| `ACQUIRE_TIMEOUT_MS` | `50` | Time to wait for a semaphore permit before returning `429` |
| `REQUESTS_PER_SECOND` | `10` | Token-bucket rate limit |

### RabbitMQ — Publisher

| Variable | Default | Description |
|---|---|---|
| `AMQP_URI` | `amqp://guest:guest@localhost:5672/` | AMQP connection URI |
| `AMQP_EXCHANGE` | `proxy.exchange` | Target exchange name |
| `ROUTING_KEYS` | `proxy.messages` | Comma-separated list of routing keys |
| `ROUTING_STRATEGY` | `ROUND_ROBIN` | `ROUND_ROBIN` or `HASH_PATH` |
| `CHANNEL_POOL_SIZE` | `200` | Number of pooled AMQP channels |
| `CONFIRM_TIMEOUT_MS` | `5000` | Time to wait for broker publisher confirm |
| `MAX_BODY_BYTES` | `1048576` | Maximum accepted request body size (bytes) |

### RabbitMQ — Consumer

| Variable | Default | Description |
|---|---|---|
| `CONSUME_QUEUES` | *(same as `ROUTING_KEYS`)* | Comma-separated queues to consume |
| `CONSUMER_POLL_INTERVAL_MS` | `10000` | Sleep duration when all queues are empty |
| `CONSUMER_PREFETCH` | `25` | AMQP `basicQos` prefetch count |
| `CONSUMER_MAX_RETRIES` | `5` | Retry attempts before dead-lettering |
| `CONSUMER_BASE_BACKOFF_MS` | `500` | Base delay for exponential back-off |
| `CONSUMER_MAX_BACKOFF_MS` | `10000` | Maximum back-off cap |
| `DEAD_LETTER_QUEUE` | `proxy.dlq` | Queue for permanently failed messages |

---

## Build

Requires Java 21+ and Maven.

```bash
mvn package
```

Produces `target/miniint-0.1.0-jar-with-dependencies.jar`.

---

## Running

**Proxy mode:**
```bash
MODE=HTTP_PROXY \
UPSTREAM_BASE_URL=http://my-service:8000 \
MAX_IN_FLIGHT=200 \
REQUESTS_PER_SECOND=500 \
java -jar target/miniint-0.1.0-jar-with-dependencies.jar
```

**HTTP-to-MQ mode (publisher):**
```bash
MODE=HTTP_TO_MQ \
AMQP_URI=amqp://user:pass@rabbitmq:5672/ \
AMQP_EXCHANGE=my.exchange \
ROUTING_KEYS=queue.a,queue.b \
java -jar target/miniint-0.1.0-jar-with-dependencies.jar
```

**Consumer (forwards queued messages to upstream):**
```bash
UPSTREAM_BASE_URL=http://my-service:8000 \
AMQP_URI=amqp://user:pass@rabbitmq:5672/ \
CONSUME_QUEUES=queue.a,queue.b \
java -cp target/miniint-0.1.0-jar-with-dependencies.jar com.example.miniint.ConsumerApp
```

---

## Response Codes

| Code | Meaning |
|---|---|
| `202` | (`HTTP_TO_MQ`) Message accepted and durably queued |
| `429` | Concurrency or rate limit exceeded; or MQ channel pool exhausted |
| `502` | Upstream returned an error or connection failed |
| `503` | Circuit breaker open (upstream considered unhealthy) |

---

## Tech Stack

- **Java 21** — virtual threads via `Executors.newVirtualThreadPerTaskExecutor()`
- **RabbitMQ Java Client 5.22** — AMQP 0-9-1, publisher confirms, automatic topology recovery
- **Resilience4j 2.2** — token-bucket rate limiter and circuit-breaker primitives
- **WireMock 3.4** — used in integration / shell-based test scripts
