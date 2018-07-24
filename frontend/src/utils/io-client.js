import io from 'socket.io-client'

export default class IOClient {
  constructor () {
    this.socket = io(process.env.REACT_APP_WS_URL)
  }

  onMessage = (message, cb) => {
    this.socket.on(message, data => {
      cb(data)
    })
  }
}
