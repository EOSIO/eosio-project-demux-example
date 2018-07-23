import React, { Component } from "react"
import PropTypes from "prop-types"

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    tag: ''
  }

  static displayName = "CreatePost"

  static propTypes = {
    createPost: PropTypes.func.isRequired,
    toggleCreate: PropTypes.func.isRequired,
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createPost = e => {
    e.preventDefault()
    this.props.createPost({ ...this.state, likes: 0 })
    this.setState({
      title: "",
      content: "",
      tag: "",
    })
    this.props.toggleCreate()
  }

  render() {
    return (
      <div className="createContainer padding-30">
        <div className="card-item padding-30">
          <input
            className="margin-bottom-15"
            name="title"
            value={this.state.title}
            onChange={this.handleOnChange}
            placeholder="Title"
          />
          <textarea
            className="margin-bottom-15"
            name="content"
            value={this.state.content}
            onChange={this.handleOnChange}
            rows={4}
            placeholder="Content"
          />
          <input
            className="margin-bottom-15"
            name="tag"
            value={this.state.tag}
            onChange={this.handleOnChange}
            placeholder="Tag"
          />
          <button
            onClick={this.createPost}
            type="submit"
            className="margin-right-15"
          >
            Create Post
          </button>
          <button
            onClick={this.props.toggleCreate}
            type="submit"
            className="secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}
export default CreatePost
