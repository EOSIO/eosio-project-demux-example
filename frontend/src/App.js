import React, { Component } from 'react'
import axios from 'axios'

import EOSClient from './utils/eos-client'
import IOClient from './utils/io-client'
import CreatePost from './CreatePost/CreatePost'
import Posts from './Posts/Posts'
import Logo from './assets/img/logo.svg'
import './assets/styles/core.css'

class App extends Component {
  state = {
    createOpen: false,
    posts: [],
  }

  // Instantiate shared eosjs helper
  constructor(props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOS_ACCOUNT
    this.eos = new EOSClient(contractAccount, contractAccount)
    this.io = new IOClient()
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount() {
    this.loadPosts()
    this.io.onMessage('createpost', (post) => {
      this.handleUpdatePost(post)
    })
    this.io.onMessage('editpost', (post) => {
      this.handleUpdatePost(post)
    })
    this.io.onMessage('likepost', (post) => {
      this.handleLikePost(post)
    })
    this.io.onMessage('deletepost', (post) => {
      this.handleDeletePost(post)
    })
  }

  // Updated child component post
  handleUpdatePost = updatedPost => {
    this.setState((prevState) => {
      let alreadyAdded = false
      let updatedPosts = prevState.posts.map(post => {
        if (post._id === updatedPost._id) {
          alreadyAdded = true
          return { ...post, ...updatedPost }
        }
        return post
      })

      if (!alreadyAdded) {
        updatedPosts = [...updatedPosts, { ...updatedPost, likes: 0 }]
      }

      return { posts: updatedPosts }
    })
  }

  // Updated likes on child component post
  handleLikePost = (likedPost) => {
    this.setState((prevState) => {
      const updatedPosts = prevState.posts.map(post => {
        if (post._id === likedPost._id) {
          return { ...post, likes: post.likes + 1 }
        }
        return post
      })
      return { posts: updatedPosts }
    })
  }

  // Delete child component post
  handleDeletePost = deletedPost => {
    this.setState((prevState) => ({ posts: prevState.posts.filter(post => post._id !== deletedPost._id) }))
  }

  // Load posts
  loadPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    this.setState({ posts: response.data })
  }

  // Create a post
  createPost = async (post) => {
    let newPost = await axios.get(`${process.env.REACT_APP_API_URL}/posts/newEmpty`)
    newPost = { ...newPost.data, ...post, author: process.env.REACT_APP_EOS_ACCOUNT }

    this.handleUpdatePost(newPost)

    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'createpost', {
          author: process.env.REACT_APP_EOS_ACCOUNT,
          ...newPost,
        },
      )
      .catch(err => {
        console.log(err)
      })
  }

  // Delete a post
  deletePost = (post) => {
    this.handleDeletePost(post)
    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'deletepost',
        {
          contractPkey: post.contractPkey,
          _id: post._id,
        })
      .catch(err => {
        console.log(err)
      })
  }

  // Edit a post
  editPost = (post) => {
    this.handleUpdatePost(post)
    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'editpost',
        {
          ...post,
        })
      .catch(err => {
        console.log(err)
      })
  }

  // Like a post
  likePost = (post) => {
    this.handleLikePost(post)
    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'likepost', {
          contractPkey: post.contractPkey,
          _id: post._id,
        },
      )
      .catch(err => {
        console.log(err)
      })
  }

  // Toggle if create window is open
  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen,
    }))
  }

  render() {
    return (
      <div className={`layoutStandard ${this.state.createOpen ? 'createOpen' : ''}`}>
        <div className='logo'><a href='/'><img src={Logo} alt='Eos.io' /></a></div>
        <div className='main'>
          <div className='toggleCreate' onClick={this.toggleCreate}></div>
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
