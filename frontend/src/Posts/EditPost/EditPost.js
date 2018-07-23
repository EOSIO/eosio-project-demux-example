import React, { Component } from 'react';

class EditPost extends Component {
  state = {
    post: {
      title: this.props.post.title,
      content: this.props.post.content,
      tag: this.props.post.tag
    }
  };

  handleOnChange = e => {
    let post = Object.assign({}, this.state.post);
    post[e.target.name] = e.target.value;
    this.setState({ post });
  };

  handlePostSave = e => {
    this.props.savePost(this.state.post, e);
  };

  render() {
    return (
      <div className='card-item'>
        <div className="padding-30">
          <input
            className="margin-bottom-15"
            name="title"
            onChange={this.handleOnChange}
            value={this.state.post.title}
            placeholder="Title"
          />
          <textarea
            className="margin-bottom-15"
            name="content"
            onChange={this.handleOnChange}
            value={this.state.post.content}
            rows={4}
            placeholder="Content"
          />
          <input
            className="margin-bottom-15"
            name="tag"
            onChange={this.handleOnChange}
            value={this.state.post.tag}
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
    );
  }
}

export default EditPost;
