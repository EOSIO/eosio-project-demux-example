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
    const state = { post: Post, blockState: BlockState }
    await handle(state, context)
  }

  async updateIndexState(state, block, isReplay) {
    state._index_state.save({
      id: 0,
      block_number: block.blockNumber,
      block_hash: block.blockHash,
      is_replay: isReplay,
    })
  }

  async loadIndexState() {
    const { blockNumber, blockHash } = await this.massiveInstance._index_state.findOne({ id: 0 })
    if (blockNumber && blockHash) {
      return { blockNumber, blockHash }
    }
    return { blockNumber: 0, blockHash: "" }
  }
}

module.exports = ActionHandler
