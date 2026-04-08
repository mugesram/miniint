#!/bin/bash

# Professional-grade load testing script for high-traffic servers

echo "======================================"
echo "High-Traffic Load Test Suite"
echo "======================================"
echo ""

# Configuration
HOST=${1:-localhost}
PORT=${2:-8080}
RESULTS_DIR="load_test_results_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$RESULTS_DIR"

echo "Configuration:"
echo "  Host: $HOST"
echo "  Port: $PORT"
echo "  Results: $RESULTS_DIR"
echo ""

# Test 1: Baseline Test (100 threads, 60s)
echo "Phase 1: Baseline Test (100 threads, 60s)"
echo "Expected: ~1,000-2,000 req/s"
jmeter -n -t jmeter_test.jmx \
  -Jhost=$HOST \
  -Jport=$PORT \
  -Jthreads=100 \
  -Jrampup=10 \
  -Jduration=60 \
  -l "$RESULTS_DIR/baseline.jtl" \
  -e -o "$RESULTS_DIR/baseline_report" \
  -Jjmeter.save.saveservice.output_format=csv \
  -Jjmeter.save.saveservice.response_data=false

echo ""
echo "Baseline test complete. Waiting 30 seconds before next phase..."
sleep 30

# Test 2: High Load Test (500 threads, 5 minutes)
echo "Phase 2: High Load Test (500 threads, 300s)"
echo "Expected: ~5,000-10,000 req/s"
jmeter -n -t jmeter_test.jmx \
  -Jhost=$HOST \
  -Jport=$PORT \
  -Jthreads=500 \
  -Jrampup=60 \
  -Jduration=300 \
  -l "$RESULTS_DIR/high_load.jtl" \
  -e -o "$RESULTS_DIR/high_load_report" \
  -Jjmeter.save.saveservice.output_format=csv \
  -Jjmeter.save.saveservice.response_data=false

echo ""
echo "High load test complete. Waiting 60 seconds before stress test..."
sleep 60

# Test 3: Stress Test (1000 threads, 2 minutes)
echo "Phase 3: Stress Test (1000 threads, 120s)"
echo "Expected: Finding breaking point"
jmeter -n -t jmeter_test.jmx \
  -Jhost=$HOST \
  -Jport=$PORT \
  -Jthreads=1000 \
  -Jrampup=30 \
  -Jduration=120 \
  -l "$RESULTS_DIR/stress.jtl" \
  -e -o "$RESULTS_DIR/stress_report" \
  -Jjmeter.save.saveservice.output_format=csv \
  -Jjmeter.save.saveservice.response_data=false

echo ""
echo "======================================"
echo "All tests complete!"
echo "======================================"
echo ""

# Generate summary
echo "Generating performance summary..."

for test in baseline high_load stress; do
  if [ -f "$RESULTS_DIR/$test.jtl" ]; then
    echo ""
    echo "=== $test Results ==="
    total_requests=$(grep -c '^[0-9]' "$RESULTS_DIR/$test.jtl" 2>/dev/null || echo "0")
    duration=$(awk -F',' 'NR==2{first=$1} END{print ($1-first)/1000}' "$RESULTS_DIR/$test.jtl" 2>/dev/null || echo "0")
    errors=$(awk -F',' '$8=="false"{count++} END{print count+0}' "$RESULTS_DIR/$test.jtl" 2>/dev/null || echo "0")
    
    if [ "$duration" != "0" ] && [ "$total_requests" != "0" ]; then
      throughput=$(echo "scale=2; $total_requests / $duration" | bc)
      error_rate=$(echo "scale=2; ($errors / $total_requests) * 100" | bc)
      
      echo "  Total Requests: $total_requests"
      echo "  Duration: ${duration}s"
      echo "  Throughput: ${throughput} req/s"
      echo "  Errors: $errors ($error_rate%)"
      
      # Calculate percentiles
      awk -F',' 'NR>1{print $2}' "$RESULTS_DIR/$test.jtl" | sort -n > /tmp/response_times.txt
      total_lines=$(wc -l < /tmp/response_times.txt)
      
      p50_line=$(echo "$total_lines * 0.50" | bc | awk '{print int($1+0.5)}')
      p90_line=$(echo "$total_lines * 0.90" | bc | awk '{print int($1+0.5)}')
      p95_line=$(echo "$total_lines * 0.95" | bc | awk '{print int($1+0.5)}')
      p99_line=$(echo "$total_lines * 0.99" | bc | awk '{print int($1+0.5)}')
      
      p50=$(sed -n "${p50_line}p" /tmp/response_times.txt)
      p90=$(sed -n "${p90_line}p" /tmp/response_times.txt)
      p95=$(sed -n "${p95_line}p" /tmp/response_times.txt)
      p99=$(sed -n "${p99_line}p" /tmp/response_times.txt)
      
      echo "  P50 Latency: ${p50}ms"
      echo "  P90 Latency: ${p90}ms"
      echo "  P95 Latency: ${p95}ms"
      echo "  P99 Latency: ${p99}ms"
      
      rm -f /tmp/response_times.txt
    fi
  fi
done

echo ""
echo "======================================"
echo "HTML Reports Generated:"
echo "  Baseline: $RESULTS_DIR/baseline_report/index.html"
echo "  High Load: $RESULTS_DIR/high_load_report/index.html"
echo "  Stress: $RESULTS_DIR/stress_report/index.html"
echo ""
echo "Open reports with: open $RESULTS_DIR/*/index.html"
echo "======================================"
