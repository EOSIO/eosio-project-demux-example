import React from 'react';
import { Card, Icon } from 'antd';
import { Tag } from 'antd';

import './Post.css';

const Post = ({ post, deletePost, editPost, likePost }) => {
  return (
    <div className="pure-g Post">
      <div className="pure-u-4-24" />
      <div className="pure-u-16-24">
        <Card
          title={post.title}
          actions={[
            <Icon
              type="delete"
              onClick={e => {
                deletePost(post.pkey, e);
              }}
              style={{ color: '#f5222d' }}
            />,
            <Icon
              onClick={e => {
                editPost(post.pkey, e);
              }}
              type="edit"
              style={{ color: '#13c2c2' }}
            />,
            <Icon
              onClick={e => {
                likePost(post.pkey, e);
              }}
              type="heart-o"
              style={{ color: '#eb2f96' }}
            />
          ]}
        >
          <p>{post.author}</p>
          <p>{post.content}</p>
          <Tag color="geekblue">{'#' + post.tag}</Tag>
        </Card>
      </div>
      <div className="pure-u-4-24" />
    </div>
  );
};

export default Post;
