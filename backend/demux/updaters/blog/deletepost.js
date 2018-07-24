async function deletePost(state, payload, blockInfo, context) {
  try {
    await state.post.findByIdAndDelete(payload.data._id).exec()
  } catch (err) {
    console.error(err)
  }
}

module.exports = deletePost
