#!/bin/bash
# stating server
PORT=9999 node index.js &

echo "Waiting until the server starts..."
while ! timeout 1 bash -c "echo > /dev/tcp/localhost/9999 2> /dev/null"; do
  sleep 10
done
echo "Server started"

COUNTER_BEFORE=$(curl http://localhost:9999/status)
ab -n 10000 -c 300 -k http://localhost:9999/get
COUNTER_AFTER=$(curl http://localhost:9999/status)

if [ "$COUNTER_AFTER" != "$COUNTER_BEFORE" ]; then
  echo "+ ERROR during concurency test in $0"
  echo "+ Concurency issues during the load test, the counter should be identical from when it started"
  exit 1
fi

# stopping server
lsof -ti :9999 | xargs kill -9 > /dev/null

