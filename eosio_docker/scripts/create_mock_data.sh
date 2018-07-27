
#!/bin/bash

echo "=== start deploy data ==="

cleos() {
  /opt/eosio/bin/cleos "$@"
}

# cd into script's folder
cd "$(dirname "$0")"

echo "=== start create accounts in blockchain ==="

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin

# loop through the array in the json file and run createpost action on smart contract to add mock data

jq -c '.[]' mock_data.json | while read i; do
  timestamp=$(jq -r '.content' <<< "$i")
  author=$(jq -r '.author' <<< "$i")
  title=$(jq -r '.title' <<< "$i")
  content=$(jq -r '.content' <<< "$i")
  tag=$(jq -r '.tag' <<< "$i")

  # push the createpost action to the smart contract
  cleos push action blog createpost '[$timestamp, $author, $title, $content, $tag]' -p blogaccount@active
done