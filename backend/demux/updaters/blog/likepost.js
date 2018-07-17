const Post = require("../../../models/post");

function likePost({ state, payload, blockInfo, context }) {
  console.log(payload)
  Post.findByIdAndUpdate(
    payload.data._id, 
    { $inc: { likes: 1 } }, 
    (err, post) => {}
  )
}

module.exports = likePost;