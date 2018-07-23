import React, { Component } from "react"
import PropTypes from "prop-types"

import save from "../assets/img/save.svg"
import back from "../assets/img/back.svg"

class EditPost extends Component {
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

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.post.title,
      content: this.props.post.content,
      tag: this.props.post.tag,
    }
  }

  handleOnChange = (event, field) => {
    this.setState({ [field]: event.target.value })
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
            name="tag"
            onChange={(e) => this.handleOnChange(e, "tag")}
            value={this.state.tag}
            placeholder="Tag"
          />
        </div>
        <div className="padding-30 card-footer grid-2">
          <div onClick={() => this.props.savePost({ ...this.props.post, ...this.state })}>
            <img className="" src={save} alt="Update" />
          </div>
          <div onClick={this.props.toggleEditing}>
            <img className="" src={back} alt="Back" />
          </div>
        </div>
      </div>
    )
  }
}

export default EditPost
