function likepost (state, payload, blockInfo, context) {
  const post = {
    _id: {
      timestamp: payload.data.timestamp,
      author: payload.data.author
    }
  }
  context.socket.emit('likepost', post)
}

export default likepost
