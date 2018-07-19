const io = require("../../../io")

function createPost({ state, payload, blockInfo, context }) {
  const socket = io.getSocket()
  socket.emit('createpost', {...payload.data, _id: payload.transactionId+payload.actionIndex});
}

module.exports = createPost;