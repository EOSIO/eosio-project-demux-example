function likePost(state, payload, blockInfo, context) {
  state.post.findByIdAndUpdate(payload.data._id, { $inc: { likes: 1 } }, (err, post) => {
    if(err) console.error(err)
  })
}

module.exports = likePost;