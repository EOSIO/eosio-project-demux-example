import { Post } from '../../models'

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
export const listConfirmed = async (req, res) => {
  try {
    const confirmedPosts = await Post.find({ postConfirmed: true }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}
