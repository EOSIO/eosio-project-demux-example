import createPost from './createpost'
import deletePost from './deletepost'
import editPost from './editpost'
import likePost from './likepost'

const account = process.env.EOSIO_CONTRACT_ACCOUNT

export default [
  {
    actionType: `${account}::createpost`, // account::action name
    updater: createPost
  },
  {
    actionType: `${account}::deletepost`,
    updater: deletePost
  },
  {
    actionType: `${account}::editpost`,
    updater: editPost
  },
  {
    actionType: `${account}::likepost`,
    updater: likePost
  }
]
