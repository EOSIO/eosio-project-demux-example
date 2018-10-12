#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

echo "=== starting the chain for setup ==="
/opt/eosio/bin/nodeosd.sh --data-dir /root/.local/share -e &

sleep 1s

echo "=== waiting for the chain to finish startup ==="
until curl localhost:8888/v1/chain/get_info
do
	echo "Still waiting"
    sleep 1s
done

echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: blogwallet ==="
# * Replace "blogwallet" with your own wallet name when you start your own project
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n blogwallet --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > blog_wallet_password.txt
# Owner key for blogwallet wallet
cleos wallet import -n blogwallet --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for blogwallet wallet
cleos wallet import -n blogwallet --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N

# create account for blogaccount with above wallet's public keys
cleos create account eosio blogaccount EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

# * Replace "blogaccount" with your own account name when you start your own project

echo "=== deploy smart contract ==="
# $1 smart contract name 
# $2 account holder name of the smart contract
# $3 wallet that holds the keys for the account
# $4 password for unlocking the wallet
deploy_contract.sh blog blogaccount blogwallet $(cat blog_wallet_password.txt)

echo "=== create user accounts ==="
# script for creating data into blockchain
create_accounts.sh

echo "=== create mock data for contract ==="
# script for calling actions on the smart contract to create mock data
# * Replace the script above with data that you want to initialize for your project on the blockchain
create_mock_data.sh

echo "=== blockchain initialization complete ==="

# shut down nodeos, allow 2 seconds to lead out with at least 4 blocks after committing contracts
sleep 2s
kill %1
fg %1