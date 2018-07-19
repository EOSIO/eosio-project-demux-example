function deletePost({ state, payload, blockInfo, context }) {
  console.log(payload.data)
  state.Post.findByIdAndDelete(
    payload.data._id
  )
}

module.exports = deletePost;