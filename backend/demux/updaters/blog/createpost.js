function createPost(state, payload, blockInfo, context) {
  const updatedPost = { ...payload.data }
  delete updatedPost._id
  state.post.findByIdAndUpdate(payload.data._id, { ...updatedPost, postConfirmed: true }, (err) => {
    if (err) console.error(err)
  })
}

module.exports = createPost
