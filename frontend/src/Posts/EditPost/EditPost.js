import React, { Component } from "react"
import PropTypes from "prop-types"

class EditPost extends Component {
  state = {
    title: this.props.post.title,
    content: this.props.post.content,
    tag: this.props.post.tag
  }

  static displayName = "EditPost"

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
    savePost: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
  }

  handleOnChange = (event, field) => {
    this.setState({ [field]: event.target.value })
  };

  handlePostSave = e => {
    this.props.savePost(this.state.post)
  };

  render() {
    return (
      <div className="card-item">
        <div className="padding-30">
          <input
            className="margin-bottom-15"
            name="title"
            onChange={(e) => this.handleOnChange(e, "title")}
            value={this.state.title}
            placeholder="Title"
          />
          <textarea
            className="margin-bottom-15"
            name="content"
            onChange={(e) => this.handleOnChange(e, "content")}
            value={this.state.content}
            rows={4}
            placeholder="Content"
          />
          <input
            className="margin-bottom-15"
            name="tag"
            onChange={(e) => this.handleOnChange(e, "tag")}
            value={this.state.tag}
            placeholder="Tag"
          />
          <button
            onClick={this.handlePostSave}
            type="submit"
            className="margin-right-15"
          >
            Update
          </button>
          <button
            onClick={this.props.toggleEditing}
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

export default EditPost
