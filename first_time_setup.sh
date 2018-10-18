#!/usr/bin/env bash
set -o errexit

echo "=== start of first time setup ==="

# change to script's directory
cd "$(dirname "$0")"

# make sure Docker and Node.js is installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v node)" ]; then
    echo ""
    echo -e "\033[0;31m[Error with Exception]\033[0m"
    echo "Please make sure Docker and Node.js are installed"
    echo ""
    echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
    echo "Install Node.js: https://nodejs.org/en/"
    echo ""
    exit
fi

# download eosio/eos-dev:v1.3.2 image
echo "=== pull eosio/eos-dev image v1.3.2 from docker hub ==="
docker pull eosio/eos-dev:v1.3.2

# force remove the previous eosio container if it exists
# create a clean data folder in the eosio_docker to preserve block data
echo "=== setup/reset data for eosio_docker ==="
docker stop eosio_blog_container || true && docker rm --force eosio_blog_container || true
rm -rf "./eosio_docker/data"
mkdir -p "./eosio_docker/data"

# download mongo:4.0 image
echo "=== pull mongo image 4.0 from docker hub ==="
docker pull mongo:4.0

# force remove the previous mongodb container if it exists
echo "=== setup/reset data for mongo_blog_container ==="
docker stop mongo_blog_container || true && docker rm --force mongo_blog_container || true

# set up node_modules for frontend
echo "=== npm install packpage for frontend react app ==="
# change directory to ./frontend
cd "./frontend"
npm install
cd "../"

# set up node_modules for backend
echo "=== npm install packpage for frontend react app ==="
# change directory to ./backend
cd "./backend"
npm install
cd "../"
