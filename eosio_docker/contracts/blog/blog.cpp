#include "blog.hpp"

using namespace eosio;
using std::string;

class blog : public contract
{
  // blog class inherits the “contract” smart contract and use its constructor below
  using contract::contract;
public:
  // contract constructor
  explicit blog(account_name self) : contract(self) {}

  // mark with @abi action so that eosiocpp will add this as an action to the ABI

  //@abi action
  void createpost(const uint64_t timestamp, const account_name author, const string &title, const string &content, const string &tag)
  {
    // check if authorized for account to sign action
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(author);

    uint128_t skey = static_cast<uint128_t>(author) << 64 | timestamp; 
    // post_table is our multi_index
    // multi_index is how you store persistant data across actions in EOSIO
    // each action has a new action context which is a clean working memory with no prior working state from other action executions
    post_table poststable(_self, _self); // code, scope

    // add a record to our multi_index table poststable
    // const_iterator emplace( unit64_t payer, Lambda&& constructor )
    poststable.emplace(author, [&](auto &post) {
      post.pkey = poststable.available_primary_key();
      post.skey = skey;
      post.author = author;
    });
  }

  //@abi action
  void editpost(const uint64_t timestamp, const account_name author, const string &title, const string &content, const string &tag)
  {
    post_table poststable(_self, _self);

    // get object by secondary key
    auto posts = poststable.get_index<N(getbyskey)>();
    uint128_t skey = static_cast<uint128_t>(author) << 64 | timestamp; 
    auto post = posts.find(skey);
    eosio_assert(post != posts.end(), "Post for hash could not be found");

    // check if authorized to update post
    require_auth(post->author);
  }

  //@abi action
  void likepost(const uint64_t timestamp, const account_name author)
  {
    // do not require_auth since want to allow anyone to call

    post_table poststable(_self, _self);

    auto posts = poststable.get_index<N(getbyskey)>();
    uint128_t skey = static_cast<uint128_t>(author) << 64 | timestamp; 

    // verify it already exists
    auto post = posts.find(skey);
    eosio_assert(post != posts.end(), "Post for hash not found");
  }

  //@abi action
  void deletepost(const uint64_t timestamp, const account_name author)
  {
    post_table poststable(_self, _self);

    auto posts = poststable.get_index<N(getbyskey)>();
    uint128_t skey = static_cast<uint128_t>(author) << 64 | timestamp; 

    auto post = posts.find(skey);
    eosio_assert(post != posts.end(), "Post for hash could not be found");

    // check if authorized to delete post
    require_auth(post->author);

    auto toDeletePost = poststable.find(post->pkey);
    poststable.erase(toDeletePost);
  }

private:
  // mark with @abi table so that eosiocpp will add this as a multi_index to the ABI with an index of type i64

  //@abi table posts i64
  struct post_struct
  {
    uint64_t pkey;
    uint64_t author;
    uint128_t skey;

    // primary key
    uint64_t primary_key() const { return pkey; }

    // secondary key
    uint128_t get_by_skey() const { return skey; }

    // call macro
    EOSLIB_SERIALIZE(post_struct, (pkey)(author)(skey))
  };

  // typedef multi_index<N(table_name), object_template_to_use, other_indices> multi_index_name;
  typedef eosio::multi_index<N(posts), post_struct,
                      indexed_by<N(getbyskey), const_mem_fun<post_struct, uint128_t, &post_struct::get_by_skey>>>
      post_table;
};

EOSIO_ABI(blog, (createpost)(deletepost)(likepost)(editpost))