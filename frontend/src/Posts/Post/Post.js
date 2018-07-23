import React, { Component } from "react"
import PropTypes from "prop-types"

import user from "../assets/img/user.svg"
import heart from "../assets/img/heart.svg"
import pencil from "../assets/img/pencil.svg"
import trash from "../assets/img/trash.svg"

import EditPost from "../EditPost/EditPost"

class Post extends Component {
  static displayName = "Post"

  static propTypes = {
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      contractPkey: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
    }).isRequired,
    editPost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      liked: false,
    }
  }

  toggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing,
    }))
  };

  savePost = (post) => {
    this.props.editPost(post)
    this.setState(prevState => ({
      editing: !prevState.editing,
    }))
  };

  render() {
    const { editing } = this.state
    return (
      !editing ? (
        <div className="card-item">
          <div className="padding-30">
            <h3>{this.props.post.title}</h3>
            <p>{this.props.post.content}</p>
            <h5><img className="author" src={user} alt="User" /> {this.props.post.author}</h5>
            <hr />
            <small>Likes {this.props.post.likes} | Tags {`#${this.props.post.tag}`}</small>

          </div>
          <div className="padding-30 card-footer grid-3">
            <div onClick={() => {
              this.props.deletePost(this.props.post.contractPkey, this.props.post._id)
            }}
            ><img className="margin-right-15" src={trash} alt="Delete" />
            </div>
            <div onClick={this.toggleEditing}><img className="margin-right-15" src={pencil} alt="Update" /></div>
            <div onClick={() => {
              this.setState(prevState => ({
                liked: !prevState.liked,
              }))
              this.props.likePost(this.props.post)
            }}
            ><img className="" src={heart} alt="Heart" />
            </div>
          </div>
        </div>
      ) : (
        <div className="card-item">
          <EditPost savePost={this.savePost} post={this.props.post} toggleEditing={this.toggleEditing} />
        </div>
      )
    )
  }
}

export default Post
