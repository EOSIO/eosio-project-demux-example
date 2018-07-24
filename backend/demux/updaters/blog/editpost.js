async function editPost(state, payload, blockInfo, context) {
  try {
    await state.post.findByIdAndUpdate(payload.data._id, payload.data).exec()
  } catch (err) {
    console.error(err)
  }
}

module.exports = editPost
