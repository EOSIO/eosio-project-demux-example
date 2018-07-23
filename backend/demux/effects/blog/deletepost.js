function deletePost(state, payload, blockInfo, context) {
  context.socket.emit('deletepost', payload.data);
}

module.exports = deletePost;