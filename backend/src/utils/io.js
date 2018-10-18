import socketIO from 'socket.io'

let io = null

const connect = (server) => {
  io = socketIO(server)
}

const getSocket = () => io

export default {
  connect,
  getSocket
}
