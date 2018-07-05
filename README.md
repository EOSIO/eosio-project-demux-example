# eos-blog-dapp

Instructions and implementation written and tested for EOSIO v1.0.7

## Prerequisites

You have completed the steps in [
Setting Up A Local Environment](https://github.com/EOSIO/eos/wiki/Local-Environment) from the EOSIO documentation with keosd & nodeos running.

Make sure to checkout the tag v1.0.7
```bash
    git checkout tags/v1.0.7
```

## Getting Started

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

1.  Update the [frontend/src/lib/eos-client.js](https://github.com/TaraTritt/eos-blog-dapp/blob/master/frontend/src/lib/eos-client.js) with your Eos node configuration
    ```javascript
    const EOS_CONFIG = {
      chainId: '<Chain Id>',
      keyProvider: ['<Active Private Key>'],
      broadcast: true,
      sign: true
    };
    ```
    * You can get the chainId via the command:
    ```bash
    cleos get info
    ```
    * You should have set the active key when you created the account in step 4 above
2.  Start the react app
    ```bash
    cd frontend
    npm start
    ```
