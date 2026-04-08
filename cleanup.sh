#!/bin/bash

# Cleanup script to kill processes on ports 8080 and 9000

echo "Cleaning up ports 8080 and 9000..."
echo ""

# Kill processes on port 9000 (Upstream Server)
echo "Killing process on port 9000 (UpstreamServer)..."
lsof -ti:9000 | xargs kill -9 2>/dev/null || true

# Kill processes on port 8080 (Proxy)
echo "Killing process on port 8080 (Proxy)..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Kill any Java processes
echo "Killing all Java processes..."
pkill -9 java 2>/dev/null || true

sleep 1

echo ""
echo "Verifying ports are free..."
if ! lsof -ti:8080 > /dev/null 2>&1; then
    echo "✓ Port 8080 is free"
else
    echo "✗ Port 8080 is still in use"
fi

if ! lsof -ti:9000 > /dev/null 2>&1; then
    echo "✓ Port 9000 is free"
else
    echo "✗ Port 9000 is still in use"
fi

echo ""
echo "Cleanup complete!"
