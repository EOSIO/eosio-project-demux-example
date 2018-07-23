const {
  handlers: { AbstractActionHandler },
} = require("demux")
const mongoose = require("mongoose")
const Post = require("../api/post/post.model")
const io = require("../utils/io")

class ActionHandler extends AbstractActionHandler {
  constructor(updaters, effects, uri) {
    mongoose.connect(uri)

    // CONNECTION EVENTS
    // Connection successful
    mongoose.connection.on("connected", () => {
      console.info(`Mongoose default connection open to ${uri}`)

      // If using nodemon to restart the server on change - prevents duplicate records in the db
      // Clear db on each restart
      if (process.env.MONGODB_CLEAR_ON_RESTART === "true") {
        mongoose.connection.db.dropDatabase()
      }
    })

    // Connection throws an error
    mongoose.connection.on("error", console.error.bind(console, "Mongoose default connection error:"))

    // Connection is disconnected
    mongoose.connection.on("disconnected", () => {
      console.info("Mongoose default connection disconnected")
    })

    // Close the connection if the node process is terminated
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.info("Mongoose default connection disconnected through app termination")
        process.exit(0)
      })
    })
    super(updaters, effects)
  }

  async handleWithState(handle) {
    const context = { socket: io.getSocket() }
    const state = { post: Post }
    await handle(state, context)
  }
}

module.exports = ActionHandler
