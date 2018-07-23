function createPost(state, payload, blockInfo, context) {
  context.socket.emit("createpost", { ...payload.data })
}

module.exports = createPost
