const Post = require('./post.model')

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
const listConfirmed = async (req, res) => {
  try {
    const confirmedPosts = await Post.find({ postConfirmed: true }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Create a new empty post to generate a contractPkey and _id to add to the blockchain
 * @returns {Post}
 */
const createEmpty = async (req, res) => {
  const post = new Post()
  try {
    await post.save().exec()
    res.send(post)
  } catch (err) {
    console.error(err)
  }
}

module.exports = { listConfirmed, createEmpty }
