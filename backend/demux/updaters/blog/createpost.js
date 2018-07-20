const io = require("../../../io")

function createPost({ state, payload, blockInfo, context }) {
  const Post = state.Post;
  const post = new Post({...payload.data})
  post.save(err => {
    if(err) console.log(err)
  })
}

module.exports = createPost;