#!/bin/bash

# Test 1: SEMAPHORE - Concurrency Limiting
# Tests if MAX_IN_FLIGHT=20 allows max 20 concurrent requests

PROXY_URL="http://localhost:8080"

echo "=================================================="
echo "TEST 1: SEMAPHORE - Concurrency Limiting (Max 20)"
echo "=================================================="
echo ""
echo "Sending 30 concurrent requests..."
echo ""

success_count=0
blocked_count=0
tmp_file=$(mktemp)

echo "Sending 30 concurrent requests..."

for i in {1..600}; do
(
    response=$(curl -s -w "\n%{http_code}" "$PROXY_URL/test")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')   # everything except last line

    if [ "$http_code" = "200" ]; then
        echo "success" >> "$tmp_file"
        echo "[$i] ✓ 200 OK"
        echo "[$i] Response:"
        echo "$body"
        echo "------------------------"

    elif [ "$http_code" = "429" ]; then
        echo "blocked" >> "$tmp_file"
        echo "[$i] ✗ 429 Too Many Requests"
        echo "[$i] Response:"
        echo "$body"
        echo "------------------------"

    else
        echo "other" >> "$tmp_file"
        echo "[$i] ? HTTP $http_code"
        echo "[$i] Response:"
        echo "$body"
        echo "------------------------"
    fi
) &
done

wait


success_count=$(grep -c "success" "$tmp_file" 2>/dev/null || echo 0)
blocked_count=$(grep -c "blocked" "$tmp_file" 2>/dev/null || echo 0)
rm -f "$tmp_file"

echo ""
echo "=================================================="
echo "RESULTS:"
echo "  Successful: $success_count"
echo "  Blocked:    $blocked_count"

if [ $success_count -eq 200 ]; then
    echo "✓ PASS - All 30 requests allowed (semaphore limit: 20)"
else
    echo "✗ FAIL - Expected 30 successes, got $success_count"
fi
echo "=================================================="
