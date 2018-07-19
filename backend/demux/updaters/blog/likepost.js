function likePost({ state, payload, blockInfo, context }) {
  console.log(payload)
  console.log(blockInfo)
  state.Post.findByIdAndUpdate(
    payload.data._id, 
    { $inc: { likes: 1 } }, 
    (err, post) => {}
  )
}

module.exports = likePost;