const Post = require("../../../models/post");

function editPost({ state, payload, blockInfo, context }) {
  Post.findByIdAndUpdate(
    payload.data._id,
    payload.data
  )
}

module.exports = editPost;