<<<<<<< HEAD
async function likePost(state, payload, blockInfo, context) {
=======
async function likePost (state, payload, blockInfo, context) {
>>>>>>> 12a7b56cf73e1d32ec98dd2b583b536b2764c7c6
  try {
    await state.post.findByIdAndUpdate(payload.data._id, { $inc: { likes: 1 } }).exec()
  } catch (err) {
    console.error(err)
  }
}

module.exports = likePost
