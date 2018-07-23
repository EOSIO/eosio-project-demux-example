const mongoose = require("mongoose")

const { Schema } = mongoose

let BlockIndexState = null

try {
  const BlockIndexStateSchema = new Schema({
    block_number: Number,
    block_hash: String,
    is_replay: Boolean,
  })
  BlockIndexState = mongoose.model("BlockIndexState", BlockIndexStateSchema)
} catch (e) {
  BlockIndexState = mongoose.model("BlockIndexState")
}

module.exports = BlockIndexState
