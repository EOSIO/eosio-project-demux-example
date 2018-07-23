function editPost(state, payload, blockInfo, context) {
  context.socket.emit('editpost', payload.data);
}

module.exports = editPost;