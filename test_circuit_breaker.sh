#!/bin/bash
set -euo pipefail

# ---------------------- CONFIG ----------------------
PROXY_URL="http://localhost:8080"
CONCURRENT_REQUESTS=15
SLOW_THRESHOLD_MS=5000
TMP_FILE=$(mktemp)
# ---------------------------------------------------

send_requests() {
    local batch=$1
    echo "Sending $batch concurrent requests..."
    for i in $(seq 1 $batch); do
    (
        URL="$PROXY_URL/test"

        # Single curl call capturing body + status + timing
        output=$(curl -s -w "\n%{http_code} %{time_total}" "$URL")
        http_code=$(echo "$output" | tail -n1 | awk '{print $1}')
        duration_sec=$(echo "$output" | tail -n1 | awk '{print $2}')
        duration_ms=$(awk "BEGIN {printf \"%d\", $duration_sec*1000}")
        body=$(echo "$output" | sed '$d')

        # Print response
        echo "[$i] HTTP $http_code, response:"
        echo "$body"
        echo "[$i] Duration: ${duration_ms}ms"

        # Classification
        if [ "$http_code" = "502" ] || [ "$duration_ms" -ge $SLOW_THRESHOLD_MS ]; then
            echo "slow" >> "$TMP_FILE"
        elif [ "$http_code" = "503" ]; then
            echo "fast" >> "$TMP_FILE"
        else
            echo "other" >> "$TMP_FILE"
        fi
    ) &
    done
    wait
}

# ------------------ STEP 1: Send first batch ------------------
send_requests $CONCURRENT_REQUESTS

# Wait 2 seconds to let CB evaluate
echo ""
echo "Waiting 2 seconds before sending next batch..."
sleep 2
echo ""

# ------------------ STEP 2: Send second batch ------------------
send_requests $CONCURRENT_REQUESTS

# ------------------ STEP 3: Collect results ------------------
slow_fails=$(grep -c "slow" "$TMP_FILE" || echo 0)
fast_fails=$(grep -c "fast" "$TMP_FILE" || echo 0)
rm -f "$TMP_FILE"

echo ""
echo "======================================================================"
echo "RESULTS:"
echo "  Slow failures (502/upstream tried): $slow_fails"
echo "  Fast failures (503/circuit breaker): $fast_fails"
echo ""

if [ "${fast_fails:-0}" -gt 0 ]; then
    echo "✓ PASS - Circuit breaker opened and returned fast-fail (503)"
else
    echo "⚠ WARNING - Circuit breaker did not trigger yet"
fi
echo "======================================================================"
echo ""
