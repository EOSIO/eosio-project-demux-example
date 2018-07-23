const BlockIndexState = require("./block-index-state.model")

/**
 * Get single record that holds the block index state
 * @returns {BlockIndexState}
 */
const getRecord = (req, res) => {
  BlockIndexState.find({ postConfirmed: true }, (err, confirmedPosts) => {
    res.send(confirmedPosts)
  })
}

/**
 * Creates the one record to hold the block index state if it doesn't already exist
 * @returns {BlockIndexState}
 */
const createRecord = (req, res) => {
  const blockIndexState = new BlockIndexState()
  blockIndexState.save((err) => {
    if (err) console.error(err)
    res.send(blockIndexState)
  })
}

module.exports = { getRecord, createRecord }
