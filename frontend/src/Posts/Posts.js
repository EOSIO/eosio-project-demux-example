import React from 'react'

import Post from 'Posts/Post/Post'

const Posts = ({ posts, deletePost, editPost, likePost }) => posts.map(post => (
  <Post
    post={post}
    deletePost={deletePost}
    editPost={editPost}
    likePost={likePost}
    key={JSON.stringify(post._id)}
  />
))
Posts.displayName = 'Posts' // Tell React Dev Tools the component name

export default Posts
