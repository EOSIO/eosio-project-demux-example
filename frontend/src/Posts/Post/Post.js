import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

import user from '../assets/img/user.svg';
import heart from '../assets/img/heart.svg';
import pencil from '../assets/img/pencil.svg';
import trash from '../assets/img/trash.svg';

import EditPost from '../EditPost/EditPost';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      liked: false,
      post: {
        title: this.props.post.title,
        content: this.props.post.content,
        tag: this.props.post.tag,
        likes: this.props.post.likes
      }
    };
  }

  toggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  };

  savePost = (post, e) => {
    const updatePost = Object.assign(this.props.post, post);
    this.props.editPost(updatePost, e);
    this.setState(prevState => ({
      editing: !prevState.editing,
      post
    }));
  };

  render() {
    const editing = this.state.editing;
    return (
      !editing ? (
        <div className='card-item'>
          <div className="padding-30">
            <h3>{this.state.post.title}</h3>
            <h5><img src={user} alt="User"/> {this.props.post.author}</h5>
            <p>Likes {this.state.post.likes} | Tags {'#' + this.state.post.tag}</p>
            <hr />
            <p>{this.state.post.content}</p>
          </div>
          <div className="padding-30 card-footer">
            <div onClick={e => {
              this.props.deletePost(this.props.post.pkey, e);
            }}><img className="float-left margin-right-15" src={trash} alt="Delete"/></div>
            <div onClick={this.toggleEditing}><img className="float-left margin-right-15" src={pencil} alt="Update"/></div>
            <div onClick={e => {
              this.setState(prevState => ({
                liked: !prevState.liked,
                post: Object.assign(prevState.post, {
                  likes: prevState.liked ? prevState.post.likes : prevState.post.likes + 1
                })
              }));
              this.props.likePost(this.props.post.pkey, e);
            }}><img className="float-left" src={heart} alt="Heart"/></div>
          </div>
        </div>
      ) : (
        <div className='card-item'>
          <EditPost savePost={this.savePost} post={this.state.post} toggleEditing={this.toggleEditing} />
        </div>
      )
    );
  }
}

export default Post;
