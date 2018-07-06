# eos-blog-dapp

Instructions and implementation written and tested for EOSIO v1.0.7

## Prerequisites

You have completed the steps in [Building EOSIO](https://developers.eos.io/eosio-nodeos/docs/getting-the-code) from the EOSIO Developer Portal with keosd & nodeos running.

Make sure to checkout the tag v1.0.7
```bash
git checkout tags/v1.0.7
git submodule update --init --recursive
```

Before creating an account to deploy the contract you have to create a default wallet for the eosio account and import the eosio private key.

### Default wallet & eosio account

1.  Create the default wallet
    * Be sure to save this password somewhere safe. This password is used to unlock (decrypt) your wallet file.
    ```bash
    # cleos wallet create
    cleos wallet create 
    ```
2.  Import the eosio private key into the default wallet
    Find your key pair in config.ini, which can be found at:
    * Mac OS: ~/Library/Application Support/eosio/nodeos/config
    * Linux: ~/.local/share/eosio/nodeos/config
    ```bash
    # cleos wallet import <Private Key>
    cleos wallet import 
    ```

## Getting Started

* cleos, keosd, and nodeos executables can be found in the `eos/build/programs` folder after successfully building the project
* eosiocpp executable can be found in the `eos/build/tools` folder 
* They should already be available in your path

When running cleos if you get an error that it is unable to connect to keosd, execute the following:
1.  Modify the wallet config.ini
    * ~/eosio-wallet/config.ini
2.  Change `http-server-address = 127.0.0.1:8889`
3.  Run keosd
    ```bash
    keosd
    ```
4.  Specify the wallet url when running cleos
    ```bash
    cleos --wallet-url="http://localhost:8889/"
    ```

### Contract Deployment

1.  Create a wallet
    * Save the password. You will need it to unlock your wallet
    ```bash
    # cleos wallet create -n <Wallet Name>
    cleos wallet create -n blog.platform
    ```
2.  Create keys - owner and active keys
    * Save the private keys. You will need them to add the keys to the wallet
    ```bash
    cleos create key
    cleos create key
    ```
3.  Import keys into wallet
    ```bash
    # cleos wallet import <Private Key> -n <Wallet Name>
    cleos wallet import <Owner Private Key> -n blog.platform
    cleos wallet import <Active Private Key> -n blog.platform
    ```
4.  Create accounts for blog smart contract
    * Remember that accounts have no relation with keys in wallets, aside from when you sign transactions to make calls to your contract with keys
    ```bash
    # cleos create account eosio <Account> <Owner Public Key> <Active Public Key>
    cleos create account eosio blog <Owner Public Key> <Active Public Key>
    ```
5.  Compile contract to webassembly with eosiocpp
    * If you have trouble compiling, run `sudo make install` in the `eos/build` directory
    ```bash
    # eosiocpp -o <Target> <Smart Contract File>
    eosiocpp -o contract/blog.wast contract/blog.cpp
    ```
6.  Generate ABI file
    ```bash
    # eosiocpp -g <Target> <Smart Contract File>
    eosiocpp -g contract/blog.abi contract/blog.cpp
    ```
7.  Deploy contract
    ```bash
    # cleos set contract <Account> <Path to contract folder> <Path to .wast file> <Path to .abi file>
    cleos set contract blog ./contract ./contract/blog.wast ./contract/blog.abi
    ```
8.  Create a blog post
    ```bash
    # cleos push action <Account> <Action name> '<Data>' -p <Account>@active
    cleos push action blog createpost '["blog", "Sample Blog Title", "Sample blog content blah blah", "misc"]' -p blog@active
    ```
9.  Check that the blog post was added to the table
    ```bash
    # cleos get table <Contract> <Scope> <Table>
    cleos get table blog blog post
    ```

### Frontend Config

1.  Update the [frontend/src/lib/eos-client.js](https://github.com/TaraTritt/eos-blog-dapp/blob/master/frontend/src/lib/eos-client.js) with your EOS node configuration
    ```javascript
    const rpc = new eosjs.Rpc.JsonRpc('<HTTP Endpoint>');
    const signatureProvider = new eosjs.SignatureProvider(['<Active Private Key>']);
    ```
    * If you're connecting to your local running nodeos daemon:
    ```javascript
    const rpc = new eosjs.Rpc.JsonRpc('http://localhost:8888');
    ```
    * You should have set the active key when you created the account in step 4 above
2.  Start the react app
    * If you get a CORS error when running the app, modify the nodeos config.ini
        * Mac OS: ~/Library/Application Support/eosio/nodeos/config
        * Linux: ~/.local/share/eosio/nodeos/config
    * Set `access-control-allow-origin = *`
    ```bash
    cd frontend
    npm start
    ```