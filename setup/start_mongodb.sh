#!/usr/bin/env bash

echo "=== starting MongoDB container ==="

echo "=== remove previous eosio docker container ==="
docker rm -f mongo_blog_container

echo "=== run docker container from the mongo image ==="
docker run --name mongo -d -p 127.0.0.1:27017:27017 mongo:4.0