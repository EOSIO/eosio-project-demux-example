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
  void createpost(const string &_id, const account_name author, const string &title, const string &content, const string &tag)
  {
    // check if authorized for account to create a blog post
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(author);

    // post_index is our multi_index
    // multi_index is how you store persistant data across actions in EOSIO
    // each action has a new action context which is a clean working memory with no prior working state from other action executions
    post_index posts(_self, _self); // code, scope

    // add a record to our multi_index posts
    // const_iterator emplace( unit64_t payer, Lambda&& constructor )
    posts.emplace(author, [&](auto &post) {
      post._id = N(_id);
      post.author = author;
    });
  }

  //@abi action
  void deletepost(const uint64_t _id)
  {
    post_index posts(_self, _self);

    auto iterator = posts.find(_id);
    eosio_assert(iterator != posts.end(), "Post for _id could not be found");

    // check if authorized to delete post
    require_auth(iterator->author);

    posts.erase(iterator);
  }

  //@abi action
  void editpost(const uint64_t _id, const string &title, const string &content, const string &tag)
  {
    post_index posts(_self, _self);

    auto iterator = posts.find(_id);
    eosio_assert(iterator != posts.end(), "Post for _id could not be found");

    // check if authorized to update post
    require_auth(iterator->author);
  }

  //@abi action
  void likepost(const uint64_t _id)
  {
    // do not require_auth since want to allow anyone to call

    post_index posts(_self, _self);

    // verify already exist
    auto iterator = posts.find(_id);
    eosio_assert(iterator != posts.end(), "Post for _id not found");
  }

private:
  // mark with @abi table so that eosiocpp will add this as a multi_index to the ABI with an index of type i64

  //@abi table post i64
  struct post
  {
    uint64_t _id;
    uint64_t author;

    uint64_t primary_key() const { return _id; }

    uint64_t get_author() const { return author; }

    // call macro
    EOSLIB_SERIALIZE(post, (_id)(author))
  };

  // typedef multi_index<N(table_name), object_template_to_use, other_indices> multi_index_name;
  typedef multi_index<N(posts), post,
                      indexed_by<N(byauthor), const_mem_fun<post, uint64_t, &post::get_author>>>
      post_index;
};

EOSIO_ABI(blog, (createpost)(deletepost)(likepost)(editpost))