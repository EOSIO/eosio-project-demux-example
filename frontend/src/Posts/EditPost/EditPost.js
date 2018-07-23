import React, { Component } from 'react';

import pencil from '../assets/img/pencil.svg';
import back from '../assets/img/back.svg';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: this.props.post.title,
        content: this.props.post.content,
        tag: this.props.post.tag
      }
    };
  }

  handleOnChange = e => {
    let post = Object.assign({}, this.state.post);
    post[e.target.name] = e.target.value;
    this.setState({ post });
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
            name="tag"
            onChange={this.handleOnChange}
            value={this.state.post.tag}
            placeholder="Tag"
          />
        </div>
        <div className="padding-30 card-footer">
        <div onClick={e => {
          this.props.savePost(this.state.post, e);
        }}>
          <img className="float-left margin-right-15" src={pencil} alt="Update"/>
        </div>
        <div onClick={this.props.toggleEditing}>
          <img className="float-left margin-right-15" src={back} alt="Back"/>
        </div>
      </div>
    </div>
    );
  }
}

export default EditPost;
