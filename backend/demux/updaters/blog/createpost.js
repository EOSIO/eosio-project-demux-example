const Post = require("../../../models/post");

function createPost({ state, payload, blockInfo, context }) {
  const post = new Post({...payload.data})
  post.save(err => {
    if(err) console.log(err)
  })
}

module.exports = createPost;