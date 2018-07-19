const util = require('util');

let socket = null

connect = (server, cb) => {
  const io = require('socket.io')(server);
  io.on('connection', function (s) {
    socket = s
    cb(socket)
  });
}

setSocket = (s) => {
  this.socket = s
}

getSocket = () => {
  return this.socket
}


module.exports = {
  connect,
  setSocket,
  getSocket
};