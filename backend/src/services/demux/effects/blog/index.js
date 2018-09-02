import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'
import likePost from './likepost'

const account = process.env.EOSIO_CONTRACT_ACCOUNT

export default [
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
