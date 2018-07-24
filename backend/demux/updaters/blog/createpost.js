async function createPost(state, payload, blockInfo, context) {
  const updatedPost = { ...payload.data }
  delete updatedPost._id
  try {
    await state.post.findByIdAndUpdate(
      payload.data._id,
      { ...updatedPost, postConfirmed: true },
      { upsert: true },
    ).exec()
  } catch (err) {
    console.error(err)
  }
}

module.exports = createPost
