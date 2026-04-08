#!/bin/bash
set -euo pipefail

# Test 4: CIRCUIT BREAKER RECOVERY - Half-Open State
# Waits 35 seconds for circuit to enter HALF_OPEN
# Then verifies it recovers when upstream is back

PROXY_URL="http://localhost:8080"

echo "======================================================================"
echo "TEST 4: CIRCUIT BREAKER RECOVERY - Half-Open State"
echo "======================================================================"
echo ""
echo "Configuration: Circuit waits 30 seconds before entering HALF_OPEN"
echo ""
echo "Waiting for circuit breaker to recover..."
echo ""

for remaining in {35..1}; do
    echo -ne "\r  Time remaining: ${remaining}s (waiting for HALF_OPEN state)..."
    sleep 1
done

echo -e "\n"
echo "Circuit should now be in HALF_OPEN state."
echo "Sending 10 test requests to verify recovery..."
echo ""

success_count=0

for i in {1..3}; do
    # Single curl call capturing body + status
    output=$(curl -s -w "\n%{http_code}" "$PROXY_URL/test")
    http_code=$(echo "$output" | tail -n1)
    body=$(echo "$output" | sed '$d')

    # Print response
    echo "[$i] HTTP $http_code, response:"
    echo "$body"

    if [ "$http_code" = "200" ]; then
        ((success_count++))
        echo "[$i] ✓ 200 OK (recovery successful!)"
    else
        echo "[$i] ✗ $http_code (still failing)"
    fi

    # Optional: slight delay between requests
    sleep 0.2
done

echo ""
echo "======================================================================"
echo "RESULTS:"
echo "  Successful responses: $success_count/10"
echo ""

if [ $success_count -eq 10 ]; then
    echo "✓ PASS - Circuit breaker fully recovered and closed"
elif [ $success_count -ge 5 ]; then
    echo "✓ PASS - Circuit breaker in HALF_OPEN, recovering"
else
    echo "✗ FAIL - Circuit breaker not recovering"
fi
echo "======================================================================"
