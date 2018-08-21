#!/usr/bin/env bash
set -o errexit

echo "=== starting MongoDB container ==="

echo "=== run docker container from the mongo image ==="
docker run --rm --name mongo_blog_container -d -p 127.0.0.1:27017:27017 mongo:4.0

if [ "$1" != "--nolog" ]
then
    echo "=== follow mongo_blog_container logs ==="
    docker logs mongo_blog_container --follow
fi