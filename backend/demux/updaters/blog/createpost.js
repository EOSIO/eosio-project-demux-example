async function createPost (state, payload, blockInfo, context) {
  console.log(payload.data)
  const Post = state.post;
  const post = new Post(
    {
      _id: {
        author: payload.data.author,
        timestamp: payload.data.timestamp
      },
      title: payload.data.title,
      content: payload.data.content,
      tag: payload.data.tag,
      likes: payload.data.likes,
      postConfirmed: payload.data.postConfirmed
    }
  )
  try {
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

module.exports = createPost
