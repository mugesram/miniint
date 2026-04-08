#!/bin/bash

set -euo pipefail

PROXY_URL=${PROXY_URL:-"http://localhost:8080/publish"}
TOTAL_REQUESTS=${TOTAL_REQUESTS:-100}
CONCURRENCY=${CONCURRENCY:-100}
SUCCESS_FILE=$(mktemp)
FAIL_FILE=$(mktemp)

cleanup() {
  rm -f "$SUCCESS_FILE" "$FAIL_FILE"
}
trap cleanup EXIT

printf "Sending %s concurrent POST requests to %s...\n" "$TOTAL_REQUESTS" "$PROXY_URL"

sent=0
success=0
fail=0

while [ $sent -lt $TOTAL_REQUESTS ]; do
  batch=$(( TOTAL_REQUESTS - sent ))
  if [ $batch -gt $CONCURRENCY ]; then
    batch=$CONCURRENCY
  fi

  for i in $(seq 1 $batch); do
    idx=$(( sent + i ))
    (
      code=$(curl -s -o /dev/null -w "%{http_code}" \
        -X POST "$PROXY_URL" \
        -H "Content-Type: application/json" \
        -H "X-Request-Id: req-$idx" \
        --data "{\"id\":$idx,\"message\":\"hello-$idx\"}")

      printf "[%s] %s\n" "$idx" "$code"
      if [ "$code" = "202" ]; then
        echo "success" >> "$SUCCESS_FILE"
      else
        echo "fail:$code" >> "$FAIL_FILE"
      fi
    ) &
  done

  wait
  sent=$(( sent + batch ))
  printf "Sent %s/%s requests...\n" "$sent" "$TOTAL_REQUESTS"
done

success=$(wc -l < "$SUCCESS_FILE" 2>/dev/null || echo 0)
fail=$(wc -l < "$FAIL_FILE" 2>/dev/null || echo 0)

printf "Done. Success: %s, Fail: %s\n" "$success" "$fail"
