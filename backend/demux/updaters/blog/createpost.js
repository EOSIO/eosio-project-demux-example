const io = require("../../../io")

function createPost({ state, payload, blockInfo, context }) {
  console.log(payload)
  const Post = state.Post;
  const post = new Post({...payload.data, _id: payload.transactionId+payload.actionIndex})
  post.save(err => {
    if(err) console.log(err)
  })
}

module.exports = createPost;