const Post = require("./post.model")

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
const listConfirmed = (req, res) => {
  Post.find({ postConfirmed: true }, (err, confirmedPosts) => {
    res.send(confirmedPosts)
  })
}

/**
 * Create a new empty post to generate a contractPkey and _id to add to the blockchain
 * @returns {Post}
 */
const createEmpty = (req, res) => {
  const post = new Post()
  post.save((err) => {
    if (err) console.error(err)
    res.send(post)
  })
}

module.exports = { listConfirmed, createEmpty }
