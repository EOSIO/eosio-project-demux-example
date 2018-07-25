import React, { Component } from 'react'
import axios from 'axios'

import EOSIOClient from './utils/eosio-client'
import IOClient from './utils/io-client'
import CreatePost from './CreatePost/CreatePost'
import Posts from './Posts/Posts'

class App extends Component {
  state = {
    createOpen: false,
    postsMocked: [
      {
        pkey: '0',
        title: 'Fun',
        content: `You're meant to have fun in life. Let's build an almighty mountain.
        We want to use a lot pressure while using no pressure at all. You don't have
        to be crazy to do this but it does help. It's beautiful - and we haven't even
        done anything to it yet.`,
        likes: '4',
        author: 'Bob Ross',
        tag: 'mountain',
      },
      {
        pkey: '1',
        title: 'Create',
        content: `Let let all these things just sort of happen. That's what makes life so much fun.
        That you can make these decisions. That you can create the world in the way that you want.
        Follow the lay of the land. It's most important.`,
        likes: '3',
        author: 'Jane Smith',
        tag: 'world',
      },
      {
        pkey: '2',
        title: 'Clouds',
        content: `There are no mistakes. You can fix anything that happens.
        I thought today we would make a happy little stream that's just running
        through the woods here. I really believe that if you
        practice enough you could paint the 'Mona Lisa'.`,
        likes: '6',
        author: 'Sam Peters',
        tag: 'stream',
      },
      {
        pkey: '3',
        title: 'Light',
        content: `This is probably the greatest thing that's ever happened in my life.
        We need dark in order to show light. We'll do another happy little painting.
        I get carried away with this cleaning. You can create beautiful things -
        but you have to see them in your mind.`,
        likes: '3',
        author: 'Will Thompson',
        tag: 'dark',
      },
      {
        pkey: '4',
        title: 'Wild',
        content: `Let's get wild today. You can work lots of
        happy things in here. A fan brush is a fantastic piece of equipment. Automatically,
        beautiful things happen.`,
        likes: '5',
        author: 'Sara Brown',
        tag: 'brush',
      },
      {
        pkey: '5',
        title: 'Creation',
        content: `This is your creation - and it's just as unique and special as you are.
        Don't fight it, use what happens. You create the dream - then you bring it into your world.`,
        likes: '2',
        author: 'Lisa Walters',
        tag: 'dream',
      },
      {
        pkey: '6',
        title: 'Friend',
        content: `Everyone needs a friend. Friends are the most valuable things in the world.
        The light is your friend. Preserve it. It's important to me that you're happy.`,
        likes: '9',
        author: 'Ismail Phillips',
        tag: 'valuable',
      },
      {
        pkey: '7',
        title: 'Color',
        content: `When things happen they're little gifts.
        If what you're doing doesn't make you happy - you're doing the wrong thing.
        We'll make some happy little bushes here.`,
        likes: '2',
        author: 'Lewis Noel',
        tag: 'gift',
      },
    ],
    posts: []
  }

  // Instantiate shared eosjs helper
  constructor (props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOSIO_ACCOUNT
    this.eosio = new EOSIOClient(contractAccount, contractAccount)
    this.io = new IOClient()
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount () {
    this.loadPosts()
    this.io.onMessage('createpost', (post) => {
      this.handleUpdatePost(post)
    })
    this.io.onMessage('editpost', (post) => {
      this.handleUpdatePost(post)
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
      this.handleUpdatePost(newPost)
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
      this.handleDeletePost(post)
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
      this.handleUpdatePost(post)
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
      this.handleLikePost(post)
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
        <div className='logo'>Hackathon Starter</div>
        <div className='main'>
          <div className='toggleCreate' onClick={this.toggleCreate} />
          <CreatePost createPost={this.createPost} />
          <div className='cards'>
            <Posts
              posts={this.state.postsMocked}
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
