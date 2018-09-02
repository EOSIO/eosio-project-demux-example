async function deletePost (state, payload, blockInfo, context) {
  try {
    await state.post.findByIdAndDelete({ timestamp: payload.data.timestamp, author: payload.data.author }).exec()
  } catch (err) {
    console.error(err)
  }
}

export default deletePost
