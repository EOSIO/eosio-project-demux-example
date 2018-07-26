async function createPost (state, payload, blockInfo, context) {
  const Post = state.post
  const post = new Post(
    {
      _id: {
        timestamp: payload.data.timestamp,
        author: payload.data.author
      },
      title: payload.data.title,
      content: payload.data.content,
      tag: payload.data.tag,
      postConfirmed: true
    }
  )
  try {
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

module.exports = createPost
