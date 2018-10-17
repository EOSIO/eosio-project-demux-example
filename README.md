# EOSIO Demux Example

# Overview
This Blog DApp demonstrates the eosio platform running a blockchain as a local single node test net with a simple DApp. This DApp allows users to create, edit, delete and like blog posts. This guide uses scripts, containing relevant commands, which will show you how to install, build and run the DApp, and by doing so will demonstrate:

- Downloading and running eosio in docker
- Managing your docker container
- Setting up and running a local single node testnet
- Setting up wallets, keys, and accounts
- Writing and deploying a smart contract
- Implementing a Node.js server with [Demux](https://github.com/EOSIO/demux-js) to watch and read the state of the blockchain
- Setting up and using a MongoDB database to store state data relevant to the DApp
- Implementing a web based UI using React bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Connecting the UI to the blockchain using [eosjs](https://github.com/EOSIO/eosjs)

The sample DApp demonstrates how to use [Demux](https://github.com/EOSIO/demux-js) to listen and read events relevant to our smart contract actions from our locally running eosio node. By doing so we can update our MongoDB database deterministically with blog post data, reduce the amount of data stored in the contract's multi index table and write complex queries through MongoDB that are unavailable with the multi index table interface. The smart contract is being utilized to check authorization rather than storing state data in the actual action implementations. For this example, several posts are created by default and can be interacted with in the UI.

**Any private keys you see in this repository are for demo purposes only. For a real DApp NEVER expose the private keys.**

# Prerequisites

Make sure Docker and Node.js are installed

* Install Docker: https://docs.docker.com/docker-for-mac/install/
* Install Node.js: https://nodejs.org/en/

The DApp, eosio, and MongoDB will occupy the ports 3000, 4000, 8888, 9876, and 27017. Make sure nothing else is already running on these ports.

Clone the repository:
```sh
git clone https://github.com/EOSIO/eosio-project-demux-example.git
```

The following guide assumes you are using macOS.

# Quick start - Run the DApp

## EOSIO & MongoDB

In this section we provide a single command script to run all the commands needed to start the blockchain, deploy the smart contract, and run the MongoDB database. The React frontend and Node.js backend will be run with npm commands.

**To start**
```sh
./quick_start.sh
```

The above command will execute the following in sequence:

1. `first_time_setup.sh`
2. `start_eosio_docker.sh`
3. `start_mongodb_docker.sh`

**To stop**, execute:
```sh
docker stop eosio_blog_container
docker stop mongo_blog_container
```

## Frontend & Backend

The backend and frontend are configured via environment variables specified in /backend/.env
and frontend/.env respectively.

In separate terminals execute the following to start the React app and the Node.js server

**To start the backend**
```sh
cd backend
npm start
```

**To start the frontend**
```sh
cd frontend
npm start
```

**To stop**, press `ctrl+c` on your keyboard

# Detailed guide

In this section we will describe in detail each script used to run the blog DApp environment.

## Initial setup

```sh
./first_time_setup.sh
```

This script will: 
- Executing the above shell script and verify that Docker and Node.js are installed
- Download the `eosio/eos-dev` docker image (which contains a full version of the eosio blockchain) and the `mongo` docker image, and removes any previous instances of these docker containers
- Installs the node packages for the frontend React app and backend Node app

## Initialise and start blockchain and DApp

After the initialization, four terminal windows are required, all opened in the repository directory:

- The **first terminal window** is for the **blockchain** process.
- The **second terminal window** is for the **MongoDB** process.
- The **third terminal window** is for the **backend** Node app.
- The **fourth terminal window** is for the **frontend** React app.

**Running the blockchain**

For the first (blockchain) terminal window, running the following
```sh
./start_eosio_docker.sh
```

This script will:
- Start the eosio blockchain
- Create the smart contract owner account
- Deploy the smart contract
- Pre-create 6 user accounts with hard coded keys from the [accounts.json](https://github.com/EOSIO/eosio-project-demux-example/blob/master/eosio_docker/scripts/accounts.json) file
- Create mock data by sending actions to the deployed contract

The log of blockchain will be displayed on your screen. Eosio is now running and will start to produce blocks.

**Running MongoDB**

For the second (mongodb) terminal window, running the following
```sh
./start_mongodb_docker.sh
```
This script will start the mongodb database at the url mongodb://127.0.0.1/blog_platform

**Running the DApp**

The backend and frontend are configured via environment variables specified in /backend/.env
and frontend/.env respectively.

**Running the Node.js Server**

For the third (backend) terminal window, run:
```sh
cd backend
npm start
```
This script will create an Express.js http server listening on port 4000 as well as a listen for websocket connections on port 4000

**Running the React Frontend**

For the fourth (frontend) terminal window, run:
```sh
cd frontend
npm start
```
This script will open a browser session connecting to http://localhost:3000/ showing the React app. You can try to add, remove, or edit the sample blog posts using one of the accounts in [accounts.json](https://github.com/EOSIO/eosio-project-demux-example/blob/master/eosio_docker/scripts/accounts.json) and modifying the **frontend/.env** for `REACT_APP_EOSIO_ACCOUNT` and `REACT_APP_EOSIO_PRIVATE_KEY` with the name and private key of the desired account. This React app will interact with the smart contract by broadcasting transactions, which are written to the blockchain by our locally running nodeos.

## Stopping blockchain or DApp

**Stopping the blockchain**

In the first (blockchain) terminal window, press `ctrl+c` on your keyboard, the log will stop printing. And then execute:
```sh
docker stop eosio_blog_container
```

This action will take a few seconds. The blockchain will eventually be stopped.

**Stopping MongoDB**

In the second (MongoDB) terminal window, press `ctrl+c` on your keyboard, the log will stop printing. And then execute:
```sh
docker stop mongo_blog_container
```

This action will take a few seconds. The database will eventually be stopped.

**stopping the backend or frontend**

In the third (backend) or fourth(frontend) terminal window, press `ctrl+c` on your keyboard. The backend Node.js server or frontend React app will be stopped.

## Restarting blockchain/MongoDB or frontend/backend

**Restarting the blockchain**

In the first (blockchain) terminal window, execute this command:
```sh
./start_eosio_docker.sh
```

**Restarting the MongoDB**

In the second (MongoDB) terminal window, execute this command:
```sh
./start_mongodb_docker.sh
```

The MongoDB database will be resumed automatically and the logs will be outputed to the terminal.

**Restarting the backend / frontend**

In the third (backend) or fourth (frontend) terminal window, you can restart the backend Node.js server or frontend React app by executing again:
```sh
cd backend
npm start
```
```sh
cd frontend
npm start
```

## Reset blockchain data

First, you need to stop the blockchain (as above). And then execute:
```sh
./first_time_setup.sh
```

This removes all data on the blockchain, including accounts, deployed smart contracts, etc... The block count will be reset when you start the blockchain again. This will also remove all of your MongoDB databases and collections, including the collections relevant to Demux and its processing.

## Project structure

```js
eosio-project-demux-example // project directory
├── backend
│   ├── node_modules // generated after npm install
│   │   └── index.html // html skeleton for create react app
│   ├── src // generated after npm install
│   │   ├── api // Express api routes
│   │   │   └── posts.js // defines routes relates to blog posts
│   │   ├── models // Mongoose (MongoDB object modeling library) model definitions
│   │   │   ├── block-index-state.model.js // defines the mongoose BlockIndexState model to update the last processed blocks for Demux
│   │   │   ├── index.js
│   │   │   └── post.model.js // defines the mongoose Post model to store blog posts
│   │   ├── services // services 
│   │   │   ├── demux // demux implementation
│   │   │   │   ├── effects // demux effects implementations - side effects outside of the blockchain that should be triggered when blockchain events related to our smart contract are read
│   │   │   │   ├── updaters // demux updaters implementations - updates the mongodb database when blockchain events related to our smart contract are read
│   │   │   │   ├── ActionHandler.js // implementation of the demux AbstractActionHandler that connects to the mongodb database and passes in the mongoose schemas to be used to update the database by the above updaters
│   │   │   │   └── index.js // exports the demux action watcher to start watching the blockchain when .watch() is called
│   │   │   └── post // blog post service
│   │   ├── utils
│   │   │   └── io.js // provider for Socket IO to allow websocket messages to be sent out to all connections
│   │   └── index.js // starts the express.js server to listen to http requests and uses socket io to listen for websocket connections. Also initiates demux to start watching the blockchain for events
│   ├── package-lock.json // generated after npm install
│   └── package.json // for npm packages
├── eosio_docker
│   ├── * contracts // this folder will be mounted into docker
│   │   └── blog
│   │       └── blog.cpp // the main smart contract
│   ├── * data // blockchain data, generated after first_time_setup.sh
│   │   ├── blocks
│   │   ├── state
│   │   └── initialized // to indicate whether the blockchain has been initialized or not
│   └── * scripts // scripts and utilities for docker container
│       ├── accounts.json // pre-created account names, public and private keys (for demo only)
│       ├── continue_blockchain.sh // continue the stopped blockchain
│       ├── create_accounts.sh // create account data
│       ├── create_mock_data.sh // create mock blog posts
│       ├── deploy_contract.sh // deploy contract
│       ├── init_blockchain.sh // script for creating accounts and deploying contract inside docker container
│       └── mock_data.json // sample blog post data
└── frontend
    ├── node_modules // generated after npm install
    ├── public
    │   └── index.html // html skeleton for create react app
    ├── src
    │   ├── CreatePost // react component with form to create new blog posts
    │   ├── Posts // react components related to a single post
    │   │   ├── EditPost // form to edit a post
    │   │   └── Post // blog post display
    │   ├── utils // utlities for the react app
    │   └── index.js // for react-dom to render the app
    ├── package-lock.json // generated after npm install
    └── package.json // for npm packages

* means the directory will be mount to the docker container. Whenever the file changes on the local machine, it will be automatically reflected in the docker environment.
```

## DApp development

The DApp consists of four parts. The eosio blockchain, MongoDB database, backend Node.js app, and frontend React app. These can be found in:

- eosio_docker
    - eosio block producing node (local node) wrapped in a docker container
        - 1 smart contract
        - auto smart contract deployment
        - auto create 6 user accounts
        - auto create 8 sample blog posts
- mongodb_docker
    - mongodb database
        - mongodb://127.0.0.1/blog_platform
- frontend
    - node.js development environment
        - create-react-app: http://localhost:3000/
- backend
    - node.js development environment
        - Express.js server listening to port 4000 for http requests and websocket connections
        - Writes to the MongoDB database using mongoose to create schemas and execute queries

Users interact with the UI in client and sign transactions in frontend. The signed transaction is sent to the blockchain directly with eosjs. After the transaction is accepted in blockchain, the action is read by Demux and the MongoDB database is updated with the transaction data.

## Docker usage

Docker is used to wrap the eosio software and run a container (instance) from the image (eosio/eos-dev v1.3.2). To work with the blockchain directly, by running the scripts or using a cleos command line, you need to go into the container bash.

Go into container bash:
```sh
docker exec -it eosio_blog_container bash
```
We have already set the container working directory to `/opt/eosio/bin/`, you could run cleos command in this directory directly. For documentation of cleos: https://developers.eos.io/eosio-nodeos/docs/cleos-overview

You can also look at the `init_blockchain.sh` or `deploy_contract.sh` scripts for examples of cleos command lines.

To exit from inside the container bash:
```sh
exit
```

## Smart contract (Blockchain):

The smart contract can be found at `eosio_docker/contracts/blog/blog.cpp`, you can edit this smart contract. You will then need to compile and deploy the contract to the blockchain.

To save time, we prepared some scripts for you. Execute the scripts in the container bash (see above.)

The following script will help you to unlock the wallet, compile the modified contract and deploy to blockchain. 1st parameter is the contract name; 2nd parameter is the account name of the contract owner, 3rd and 4th parameter references wallet related information that was created during the `Initial setup`:
```sh
./scripts/deploy_contract.sh blog blogaccount blogwallet $(cat blog_wallet_password.txt)
```

After running this script the modified smart contract will be deployed on the blockchain.

Remember to redeploy the blog contract each time you modify it using the steps above!

## Backend:

When running the backend code, when any changes are detected nodemon will automatically update the node.js server code and restart the server.

## Frontend:

When running the frontend code, when any changes are detected the frontend React app will automatically compile and the page on browser will be automatically refreshed. You can see the change on the browser once the browser finishes loading.

## Docker commands

If you are more familiar with docker, you could use the docker commands below to have better control with the whole environment. Below are the explanations of each of the commands:

**Execute below command in `/eosio_docker`:**

Run container from eosio/eos-dev image by mounting contracts / scripts to the container with running the init_blockchain.sh script as the process.
The init_blockchain.sh script run the local node of the blockchain and initializes wallets / contract / data.
```sh
docker run --rm --name eosio_blog_container \
-p 8888:8888 -p 9876:9876 \
--mount type=bind,src="$(pwd)"/contracts,dst=/opt/eosio/bin/contracts \
--mount type=bind,src="$(pwd)"/scripts,dst=/opt/eosio/bin/scripts \
--mount type=bind,src="$(pwd)"/data,dst=/mnt/dev/data \
-w "/opt/eosio/bin/" eosio/eos-dev:v1.3.2 /bin/bash -c "./scripts/init_blockchain.sh"
```

Output and follow docker console logs:
```sh
docker logs eosio_blog_container --follow
```

Stop the container (see below troubleshoot section to see how to pause and continue the blockchain):
```sh
docker stop eosio_blog_container
```

Remove the container (will remove all wallets / contracts / data), useful if you want to re-init the whole DApp.
```sh
docker rm -f eosio_blog_container
```

# Troubleshooting
If you are having issues running any of the docker containers you may want to try the following:

### To check all existing containers, volumes and images

- `docker container ls -a`
- `docker volume ls`
- `docker image ls`

### Remove all unused containers, volumes and images

- `docker system prune -a`
- `docker container prune`
- `docker volume prune`
- `docker image prune`