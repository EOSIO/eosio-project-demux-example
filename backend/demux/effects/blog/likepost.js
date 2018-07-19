const io = require("../../../io")

function likepost({ state, payload, blockInfo, context }) {
  const socket = io.getSocket()
  socket.emit('likepost', payload.data);
}

module.exports = likepost;