function editPost({ state, payload, blockInfo, context }) {
  state.Post.findByIdAndUpdate(
    payload.data._id,
    payload.data
  )
}

module.exports = editPost;