function deletePost(state, payload, blockInfo, context) {
  state.post.findByIdAndDelete(payload.data._id, err => {
    if(err) console.error(err)
  })
}

module.exports = deletePost;