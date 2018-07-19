const Post = require("../../../models/post");

function createPost({ state, payload, blockInfo, context }) {
  const post = new Post({...payload.data, _id: payload.transactionId+payload.actionIndex})
  post.save(err => {
    if(err) console.log(err)
  })
}

module.exports = createPost;