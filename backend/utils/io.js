const socketIO = require('socket.io')

let io = null

const connect = (server) => {
  io = socketIO(server)
}

const getSocket = () => io

module.exports = {
  connect,
  getSocket
}
