import React from 'react';

const Post = ({ post, deletePost }) => {
  return (
    <div>
      <p>{post.author}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>{post.tag}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};

export default Post;
