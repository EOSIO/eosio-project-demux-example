// Update the edited post or add post to posts if a new post
export const updatePostsForCreateAndEdit = (prevState, updatedPost) => {
  let alreadyAdded = false
  let updatedPosts = prevState.posts.map(post => {
    if (post._id === updatedPost._id) {
      alreadyAdded = true
      return { ...post, ...updatedPost }
    }
    return post
  })

  if (!alreadyAdded) {
    updatedPosts = [...updatedPosts, { ...updatedPost, likes: 0 }]
  }

  return updatedPosts
}

// Update likes on liked post in posts
export const updatePostsForLike = (prevState, likedPost) => {
  const updatedPosts = prevState.posts.map(post => {
    if (post._id === likedPost._id) {
      return { ...post, likes: post.likes + 1 }
    }
    return post
  })
  return updatedPosts
}

// Remove deleted post from posts
export const updatePostsForDelete = (prevState, deletedPost) => {
  return prevState.posts.filter(post => post._id !== deletedPost._id)
}
