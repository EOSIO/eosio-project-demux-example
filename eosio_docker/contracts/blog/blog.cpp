#include "blog.hpp"

using namespace eosio;
using std::string;

// use CONTRACT macro to declare this as a contract class
CONTRACT blog : public contract {
  // blog class inherits the eosio “contract” smart contract and uses its constructor below
  using contract::contract;
public:
  // constructor
  blog( name receiver, name code, datastream<const char*> ds ):
            contract( receiver, code, ds ),
            _posts( receiver, receiver.value ) {}


  // use ACTION macro so that eosio-cpp will add this as an action to the ABI
  ACTION createpost(const uint64_t timestamp, const name author, const string &title, const string &content, const string &tag) {
    // check if authorized for author account
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(author);

    // generating secondary key (skey) value which is a composite key of the author and the timestamp
    // this allows Demux to also be able to generate and store this key when persisting the record into the database
    // since we cannot return the primary key (pkey), which is generated below (_posts.available_primary_key()), from this action
    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp; 

    // _posts is our multi_index table
    // multi_index is how you store persistant data across actions in EOSIO
    // each action has a new action context which is a clean working memory with no prior working state from other action executions
    // we are adding a record to our table
    // const_iterator emplace( unit64_t payer, Lambda&& constructor )
    _posts.emplace(author, [&](auto &post) {
      post.pkey = _posts.available_primary_key();
      post.skey = skey;
      post.author = author;
    });
  }

  ACTION editpost(const uint64_t timestamp, const name author, const string &title, const string &content, const string &tag) {
    // get posts by secondary key
    auto post_index = _posts.get_index<name("getbyskey")>();
    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp; 
    auto post = post_index.find(skey);
    eosio_assert(post != post_index.end(), "Post could not be found");

    // check if authorized to update post
    require_auth(post->author);
  }

  ACTION likepost(const uint64_t timestamp, const name author) {
    // do not require_auth since we want to allow anyone to call

    auto post_index  = _posts.get_index<name("getbyskey")>();
    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp; 

    // verify it already exists
    auto post = post_index.find(skey);
    eosio_assert(post != post_index.end(), "Post could not be found");
  }

  ACTION deletepost(const uint64_t timestamp, const name author) {
    auto post_index = _posts.get_index<name("getbyskey")>();
    uint128_t skey = static_cast<uint128_t>(author.value) << 64 | timestamp; 

    auto post = post_index.find(skey);
    eosio_assert(post != post_index.end(), "Post could not be found");

    // check if authorized to delete post
    require_auth(post->author);

    auto toDeletePost = _posts.find(post->pkey);
    _posts.erase(toDeletePost);
  }

private:
  // use TABLE macro so that eosio-cpp will add this as a multi_index to the ABI
  TABLE poststruct {
    uint64_t pkey;
    name author;
    uint128_t skey;

    // primary key
    uint64_t primary_key() const { return pkey; }

    // secondary key
    // only supports uint64_t, uint128_t, uint256_t, double or long double
    uint128_t get_by_skey() const { return skey; }
  };

  // create a multi-index table and support a secondary key
  // typedef multi_index<name(table_name), object_template_to_use, other_indices> multi_index_name;
  typedef eosio::multi_index< name("poststruct"), poststruct,
    indexed_by< name("getbyskey"), const_mem_fun<poststruct, uint128_t, &poststruct::get_by_skey> >
    > post_table;

  post_table _posts;
};

EOSIO_DISPATCH(blog, (createpost)(deletepost)(likepost)(editpost))
