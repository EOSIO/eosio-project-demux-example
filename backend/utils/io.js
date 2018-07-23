let io = null

connect = (server, cb) => {
  io = require('socket.io')(server);
}

getSocket = () => {
  return io;
}

module.exports = {
  connect,
  getSocket
};