
export const updateForCreateEdit = updatedPost => {
  this.setState((prevState) => {
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

    return { posts: updatedPosts }
  })
}

// Updated likes on child component post
export const updateForLike = (likedPost) => {
  this.setState((prevState) => {
    const updatedPosts = prevState.posts.map(post => {
      if (post._id === likedPost._id) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    })
    return { posts: updatedPosts }
  })
}

// Delete child component post
export const updateForDelete = deletedPost => {
  this.setState((prevState) => ({ posts: prevState.posts.filter(post => post._id !== deletedPost._id) }))
}
