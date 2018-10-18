import mongoose from 'mongoose'

const { Schema } = mongoose

let BlockIndexState = null

try {
  const BlockIndexStateSchema = new Schema({
    blockNumber: Number,
    blockHash: String,
    isReplay: Boolean
  })
  BlockIndexState = mongoose.model('BlockIndexState', BlockIndexStateSchema)
} catch (e) {
  BlockIndexState = mongoose.model('BlockIndexState')
}

export default BlockIndexState
