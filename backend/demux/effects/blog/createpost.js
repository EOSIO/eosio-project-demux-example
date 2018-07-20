const io = require("../../../io")

function createPost({ state, payload, blockInfo, context }) {
  const socket = io.getSocket()
  socket.emit('createpost', {...payload.data});
}

module.exports = createPost;