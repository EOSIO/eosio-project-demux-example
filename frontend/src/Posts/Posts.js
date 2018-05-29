import React from 'react';

import Post from './Post/Post';

const Posts = ({ posts, deletePost }) => {
  return posts.map((post, index) => {
    return <Post post={post} deletePost={deletePost} key={index} />;
  });
};

export default Posts;
