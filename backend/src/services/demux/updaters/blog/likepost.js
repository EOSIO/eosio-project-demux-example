async function likePost (state, payload, blockInfo, context) {
  try {
    await state.post.findByIdAndUpdate({ timestamp: payload.data.timestamp, author: payload.data.author }, { $inc: { likes: 1 } }).exec()
  } catch (err) {
    console.error(err)
  }
}

export default likePost
