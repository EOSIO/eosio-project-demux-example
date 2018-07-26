import React, { Component } from 'react'
import PropTypes from 'prop-types'

import user from '../assets/img/user.svg'
import heart from '../assets/img/heart.svg'
import heartFilled from '../assets/img/heartFilled.svg'
import pencil from '../assets/img/pencil.svg'
import trash from '../assets/img/trash.svg'

import EditPost from '../EditPost/EditPost'

class Post extends Component {
  state = {
    editing: false,
    liked: false
  };

  toggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  };

  savePost = (post) => {
    this.props.editPost(post)
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  };

  render () {
    const { editing, liked } = this.state
    return (
      !editing ? (
        <div className='card-item'>
          <div className='padding-30'>

            <div
              onClick={() => {
                this.setState(prevState => ({
                  liked: !prevState.liked
                }))
                this.props.likePost(this.props.post)
              }}
              className='icon'
            >
              {!liked ? (
                <img className='heart' src={heart} alt='Heart' />
              ) : (
                <img className='heart' src={heartFilled} alt='Heart' />
              )}
            </div>

            <h2>{this.props.post.title}</h2>
            <p>{this.props.post.content}</p>

          </div>

          <div className='padding-30 card-footer grid-2'>

            <div
              onClick={() => {
                this.props.deletePost(this.props.post)
              }}
              className='icon'
            >
              <img src={trash} alt='Delete icon' />
            </div>

            <div onClick={this.toggleEditing} className='icon'>
              <img src={pencil} alt='Update' />
            </div>

          </div>

          <div className='padding-30'>

            <small>
              <img className='author' src={user} alt='User' /> {this.props.post.author}
              <strong>Likes</strong>  {this.props.post.likes} <strong>Tags</strong>
              {`#${this.props.post.tag}`}
            </small>

          </div>
        </div>
      ) : (
        <EditPost savePost={this.savePost} post={this.props.post} toggleEditing={this.toggleEditing} />
      )
    )
  }
}
Post.displayName = 'Post' // Tell React Dev Tools the component name

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired
    }),
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired
  }).isRequired,
  editPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default Post
