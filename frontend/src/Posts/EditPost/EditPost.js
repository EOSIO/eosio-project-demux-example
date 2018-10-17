import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditPost extends Component {
  state = {
    title: this.props.post.title,
    content: this.props.post.content,
    tag: this.props.post.tag
  }

  handleOnChange = (event, field) => {
    this.setState({ [field]: event.target.value })
  }

  handlePostSave = () => {
    this.props.savePost({ ...this.props.post, ...this.state })
  }

  render () {
    return (
      <div className='card-item'>
        <div className='padding-30'>
          <input
            className='margin-bottom-15'
            name='title'
            onChange={(e) => this.handleOnChange(e, 'title')}
            value={this.state.title}
            placeholder='Title'
          />
          <textarea
            className='margin-bottom-15'
            name='content'
            rows='6'
            onChange={(e) => this.handleOnChange(e, 'content')}
            value={this.state.content}
            placeholder='Content'
          />
          <input
            className='margin-bottom-15'
            name='tag'
            onChange={(e) => this.handleOnChange(e, 'tag')}
            value={this.state.tag}
            placeholder='Tag'
          />
          <button
            onClick={this.handlePostSave}
            type='submit'
            className='margin-right-15'
          >
            Update
          </button>
          <button
            onClick={this.props.toggleEditing}
            type='submit'
            className='secondary'
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}
EditPost.displayName = 'EditPost' // Tell React Dev Tools the component name

// Assign Prop Types
EditPost.propTypes = {
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
  savePost: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired
}

export default EditPost
