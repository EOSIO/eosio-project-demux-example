function likepost (state, payload, blockInfo, context) {
  context.socket.emit('likepost', payload.data)
}

module.exports = likepost
