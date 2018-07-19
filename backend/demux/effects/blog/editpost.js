const io = require("../../../io")

function editPost({ state, payload, blockInfo, context }) {
  const socket = io.getSocket()
  socket.emit('editpost', payload.data);
}

module.exports = editPost;