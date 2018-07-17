const Post = require("../../../models/post");

function deletePost({ state, payload, blockInfo, context }) {
  console.log(payload.data)
  Post.findByIdAndDelete(
    payload.data._id
  )
}

module.exports = deletePost;