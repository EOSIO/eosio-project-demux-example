import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

import user from '../assets/img/user.svg';
import heart from '../assets/img/heart.svg';
import pencil from '../assets/img/pencil.svg';
import trash from '../assets/img/trash.svg';

import EditPost from '../EditPost/EditPost';

class Post extends Component {
  state = {
    editing: false,
    liked: false,
  };

  toggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  };

  savePost = (post, e) => {
    this.props.editPost(post, e);
    this.setState(prevState => ({
      editing: !prevState.editing,
    }));
  };

  render() {
    const editing = this.state.editing;
    return (
      !editing ? (
        <div className='card-item'>
          <div className="padding-30">
            <div onClick={e => {
              this.setState(prevState => ({
                liked: !prevState.liked
              }));
              this.props.likePost(this.props.post.contractPkey, this.props.post._id, e);
            }} className="icon">
              <img className="heart" src={heart} alt="Heart"/>
            </div>

            <h2>{this.props.post.title}</h2>
            <p>{this.props.post.content}</p>

            <hr />
            <small><img className="author" src={user} alt="User"/> {this.props.post.author} <strong>Likes</strong>  {this.props.post.likes} <strong>Tags</strong>  {'#' + this.props.post.tag}</small>

          </div>
          <div className="padding-30 card-footer grid-2">
            <div onClick={e => {
              this.props.deletePost(this.props.post.contractPkey, this.props.post._id, e);
            }} className="icon">
              <img src={trash} alt="Delete icon"/>
            </div>
            <div onClick={this.toggleEditing} className="icon">
              <img src={pencil} alt="Update"/>
            </div>
          </div>
        </div>
      ) : (
        <div className='card-item'>
          <EditPost savePost={this.savePost} post={this.props.post} toggleEditing={this.toggleEditing} />
        </div>
      )
    );
  }
}

export default Post;
