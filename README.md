# eos-blog-dapp

Instructions written for EOSIO Dawn 4.2

## Prerequisites

You have completed the steps in [
Setting Up A Local Environment](https://github.com/EOSIO/eos/wiki/Local-Environment) from the EOSIO documentation with keosd & nodeos running.

## Getting Started

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
