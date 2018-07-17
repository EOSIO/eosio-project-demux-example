const createPost = require("./createpost")
const deletePost = require("./deletepost")
const editPost = require("./editpost")
const likePost = require("./likepost")

const account = process.env.EOS_ENV === "local" ? process.env.EOS_LOCAL_CONTRACT_ACCOUNT : process.env.EOS_TEST_CONTRACT_ACCOUNT

module.exports = [
    {
        actionType: `${account}::createpost`, //account::action name
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
    },
]
