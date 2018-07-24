async function likePost (state, payload, blockInfo, context) {
  try {
    await state.post.findByIdAndUpdate(payload.data._id, { $inc: { likes: 1 } }).exec()
  } catch (err) {
    console.error(err)
  }
}

module.exports = likePost
