import React, { Component } from 'react'
import axios from 'axios'

import EOSIOClient from './utils/eosio-client'
import IOClient from './utils/io-client'
import { updatePostsForCreateAndEdit, updatePostsForLike, updatePostsForDelete } from './utils/posts-updater';
import CreatePost from './CreatePost/CreatePost'
import Posts from './Posts/Posts'
import Logo from './assets/img/logo.svg'
import './assets/styles/core.css'

class App extends Component {
  state = {
    createOpen: false,
    posts: []
  }

  // Instantiate shared eosjs helper
  constructor (props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOSIO_ACCOUNT
    this.eosio = new EOSIOClient(contractAccount)
    this.io = new IOClient()
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount () {
    this.loadPosts()
    this.io.onMessage('createpost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }));
    })
    this.io.onMessage('editpost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }));
    })
    this.io.onMessage('deletepost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForDelete(prevState, post) }));
    })
  }

  // Load posts
  loadPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    this.setState({ posts: response.data })
  }

  // Create a post
  createPost = async (post) => {
    try {
      let newPost = await axios.get(`${process.env.REACT_APP_API_URL}/posts/newEmpty`)
      newPost = { ...newPost.data, ...post, author: process.env.REACT_APP_EOSIO_ACCOUNT }

      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'createpost', {
          author: process.env.REACT_APP_EOSIO_ACCOUNT,
          ...newPost
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, newPost) }));
    } catch (err) {
      console.error(err)
    }
  }

  // Edit a post
  editPost = async (post) => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'editpost',
        {
          ...post
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }));
    } catch (err) {
      console.error(err)
    }
  }

  // Delete a post
  deletePost = async (post) => {
    try {
      this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'deletepost',
        {
          contractPkey: post.contractPkey,
          _id: post._id
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForDelete(prevState, post) }));
    } catch (err) {
      console.error(err)
    }
  }

  // Like a post
  likePost = async (post) => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'likepost', {
          contractPkey: post.contractPkey,
          _id: post._id
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForLike(prevState, post) }));
    } catch (err) {
      console.error(err)
    }
  }

  // Toggle if create window is open
  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }))
  }

  render () {
    return (
      <div className={`layoutStandard ${this.state.createOpen ? 'createOpen' : ''}`}>
        <div className='logo'><a href='/'><img src={Logo} alt='Eos.io' /></a></div>
        <div className='main'>
          <div className='toggleCreate' onClick={this.toggleCreate} />
          <CreatePost createPost={this.createPost} toggleCreate={this.toggleCreate} />
          <div className='cards'>
            <Posts
              posts={this.state.posts}
              handleOnChange={this.handleOnChange}
              deletePost={this.deletePost}
              editPost={this.editPost}
              likePost={this.likePost}
            />
          </div>
        </div>
      </div>
    )
  }
}
App.displayName = 'App' // Tell React Dev Tools the component name

export default App
