const createPost = require('./createpost')
const deletePost = require('./deletepost')
const editPost = require('./editpost')
const likePost = require('./likepost')

const account = process.env.EOSIO_CONTRACT_ACCOUNT

module.exports = [
  {
    actionType: `${account}::createpost`, // account::action name
    effect: createPost
  },
  {
    actionType: `${account}::deletepost`,
    effect: deletePost
  },
  {
    actionType: `${account}::editpost`,
    effect: editPost
  },
  {
    actionType: `${account}::likepost`,
    effect: likePost
  }
]
