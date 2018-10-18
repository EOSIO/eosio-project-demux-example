function deletePost (state, payload, blockInfo, context) {
  const post = {
    _id: {
      timestamp: payload.data.timestamp,
      author: payload.data.author
    }
  }
  context.socket.emit('deletepost', post)
}

export default deletePost
