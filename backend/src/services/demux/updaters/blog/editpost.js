async function editPost (state, payload, blockInfo, context) {
  console.log(payload)
  try {
    await state.post.findByIdAndUpdate({ timestamp: payload.data.timestamp, author: payload.data.author }, payload.data).exec()
  } catch (err) {
    console.error(err)
  }
}

module.exports = editPost
