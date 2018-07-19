const io = require("../../../io")

function deletePost({ state, payload, blockInfo, context }) {
  const socket = io.getSocket()
  socket.emit('deletepost', payload.data);
}

module.exports = deletePost;