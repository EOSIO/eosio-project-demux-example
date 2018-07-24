function editPost (state, payload, blockInfo, context) {
  state.post.findByIdAndUpdate(payload.data._id, payload.data, (err) => {
    if (err) console.error(err)
  })
}

module.exports = editPost
