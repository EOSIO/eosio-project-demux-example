import React, { Component } from 'react';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tag: ''
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = e => {
    e.preventDefault();
    this.props.createPost(this.state);
    this.setState({
      title: '',
      content: '',
      tag: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.createPost}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          placeholder="Title"
          onChange={this.handleOnChange}
        />

        <textarea name="content" value={this.state.content} onChange={this.handleOnChange} />

        <input
          type="text"
          name="tag"
          value={this.state.tag}
          placeholder="tag"
          onChange={this.handleOnChange}
        />

        <button type="submit">Create Post</button>
      </form>
    );
  }
}

export default CreatePost;
