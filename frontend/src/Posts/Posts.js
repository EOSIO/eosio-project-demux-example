import React from 'react'

import Post from './Post/Post'

const Posts = ({ posts, deletePost, editPost, likePost }) => posts.map(post => (
  <Post
    post={post}
    deletePost={deletePost}
    editPost={editPost}
    likePost={likePost}
    key={post._id}
  />
))

export default Posts
