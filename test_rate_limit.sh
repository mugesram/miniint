#!/bin/bash

# Test 2: RATE LIMITING - Token Bucket
# Tests if REQUESTS_PER_SECOND=10 limits to ~10 req/sec
# 30 requests should take ~3 seconds

PROXY_URL="http://localhost:8080"

echo "======================================================================"
echo "TEST 2: RATE LIMITING - Token Bucket (Max 10 req/sec)"
echo "======================================================================"
echo ""
echo "Configuration: 30 requests with 10 req/sec limit = ~3 seconds expected"
echo ""

start_time=$(date +%s%N)

echo "Sending 30 requests..."
for i in {1..30}; do
    curl -s "$PROXY_URL/test" > /dev/null 2>&1 &
    [ $((i % 10)) -eq 0 ] && echo "  $i requests sent..."
done

echo "  Waiting for all requests to complete..."
wait

end_time=$(date +%s%N)
duration_ms=$(( (end_time - start_time) / 1000000 ))

echo ""
echo "======================================================================"
echo "RESULTS:"
echo "  Total requests: 30"
echo "  Duration: ${duration_ms}ms"
echo "  Expected: ~3000ms (30 req / 10 req/sec)"
echo "  Actual rate: $((30 * 1000 / duration_ms)) req/sec"
echo ""

if [ $duration_ms -ge 2500 ] && [ $duration_ms -le 4500 ]; then
    echo "✓ PASS - Rate limiting working (within 2.5-4.5 seconds)"
elif [ $duration_ms -lt 2500 ]; then
    echo "✗ FAIL - Requests completed too fast (rate limiting not working)"
else
    echo "⚠ WARNING - Requests took longer than expected (might be proxy load)"
fi
echo "======================================================================"
