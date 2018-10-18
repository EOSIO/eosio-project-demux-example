async function createPost (state, payload, blockInfo, context) {
  const Post = state.post
  try {
    let post = await Post.find(
      {
        _id: {
          timestamp: payload.data.timestamp,
          author: payload.data.author
        }
      }
    ).exec()

    // if post already exists do not insert it in again
    if (post.length !== 0) return

    post = new Post(
      {
        _id: {
          timestamp: payload.data.timestamp,
          author: payload.data.author
        },
        author: payload.data.author,
        title: payload.data.title,
        content: payload.data.content,
        tag: payload.data.tag,
        postConfirmed: true
      }
    )
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

export default createPost
