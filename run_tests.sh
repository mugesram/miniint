#!/bin/bash

# Master setup and run script
# Builds project, starts upstream server and proxy, then runs tests one by one

set -e

PROJECT_DIR="/Users/mugesram/Documents/InteliJ Codes/miniint"
UPSTREAM_PORT=9000
PROXY_PORT=8080
UPSTREAM_URL="http://localhost:$UPSTREAM_PORT"
PROXY_URL="http://localhost:$PROXY_PORT"



echo "╔══════════════════════════════════════════════════════╗"
echo "║   HTTP Proxy Test Suite - Separate Test Scripts     ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Step 0: Build
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Building project..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "$PROJECT_DIR"
mvn clean package -DskipTests
echo "✓ Build successful"
echo ""

# Step 1: Start Upstream Server
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Starting Upstream Server on port $UPSTREAM_PORT..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
mvn -q exec:java \
  -Dexec.mainClass=com.example.miniint.http.UpstreamServer \
  > /tmp/upstream.log 2>&1 &
UPSTREAM_PID=$!
sleep 6

if curl -s "$UPSTREAM_URL/" > /dev/null; then
    echo "✓ Upstream Server running (PID: $UPSTREAM_PID)"
else
    echo "✗ Failed to start Upstream Server"
    exit 1
fi
echo ""

# Step 2: Start Proxy
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Starting Proxy in HTTP_PROXY mode on port $PROXY_PORT..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
export MODE=HTTP_PROXY
export LISTEN_HOST=0.0.0.0
export LISTEN_PORT=$PROXY_PORT
export UPSTREAM_BASE_URL=$UPSTREAM_URL
export REQUEST_TIMEOUT_MS=50000
export MAX_IN_FLIGHT=10000
export ACQUIRE_TIMEOUT_MS=100
export REQUESTS_PER_SECOND=1000

java -jar target/miniint-0.1.0-jar-with-dependencies.jar > /tmp/proxy.log 2>&1 &
PROXY_PID=$!
sleep 3

# Check if proxy started
if ps -p $PROXY_PID > /dev/null; then
    echo "✓ Proxy process started (PID: $PROXY_PID)"
else
    echo "✗ Proxy process failed to start"
    echo "Error log:"
    cat /tmp/proxy.log
    exit 1
fi

# Test connectivity
if curl -s "$PROXY_URL/test" > /dev/null 2>&1; then
    echo "✓ Proxy Server running (PID: $PROXY_PID)"
    echo "  Config: MAX_IN_FLIGHT=20, REQUESTS_PER_SECOND=10"
else
    echo "✗ Failed to start Proxy Server"
    exit 1
fi
echo ""

# # Run tests
# echo "Press ENTER to run Test 1 (Semaphore)..."
# read

# cd "$PROJECT_DIR"
# bash test_semaphore.sh
# # echo ""
# # echo "Press ENTER to run Test 2 (Rate Limiting)..."
# # read

# # bash test_rate_limit.sh
# echo ""
# echo "Press ENTER to run Test 3 (Circuit Breaker)..."
# read

# bash test_circuit_breaker.sh
# echo ""
# echo "Press ENTER to run Test 4 (Circuit Breaker Recovery)..."
# echo "  Note: This test waits 35 seconds, run in a separate terminal if preferred"
# read

# bash test_circuit_recovery.sh
# echo ""

# echo "╔══════════════════════════════════════════════════════╗"
# echo "║   All Tests Completed!                              ║"
# echo "╚══════════════════════════════════════════════════════╝"
