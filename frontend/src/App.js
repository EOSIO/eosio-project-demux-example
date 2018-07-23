import React, { Component } from 'react';
import axios from 'axios';
import Fuse from "fuse.js"

import fuseConfig from "./fuseConfig";
import EOSClient from './util/eos-client';
import IOClient from './util/io-client';
import CreatePost from './CreatePost/CreatePost';
import Posts from './Posts/Posts';
import Logo from './assets/img/logo-inverted.svg';
import './assets/styles/core.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createOpen: false,
      loading: false,
      posts: [],
      postsFiltered: [],
      filters: [],
      returnedAmount: 25,
    };
    const contractAccount = process.env.REACT_APP_EOS_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);
    this.io = new IOClient();
  }

  async componentDidMount() {
    this.loadPosts();
    this.io.onMessage('createpost', (post) => {
      this.handleUpdatePostMessage(post)
    });
    this.io.onMessage('editpost', (post) => {
      this.handleUpdatePostMessage(post)
    });
    this.io.onMessage('likepost', (post) => {
      this.handleLikePostMessage(post)
    });
    this.io.onMessage('deletepost', (post) => {
      this.handleDeletePostMessage(post)
    });
  }

  handleUpdatePostMessage = updatedPost => {
    let alreadyAdded = false;
    let updatedPosts = this.state.posts.map((post, index) => {
      if(post._id === updatedPost._id) {
        alreadyAdded = true;
        return { ...post, ...updatedPost}
      }
      return post;
    })

    if(!alreadyAdded) {
      updatedPost.likes = 0;
      updatedPosts = [...updatedPosts, updatedPost];
    }

    this.setState({
      posts: updatedPosts
    })
  }

  handleLikePostMessage = likedPost => {
    let updatedPosts = this.state.posts.map((post, index) => {
      if(post._id === likedPost._id) {
        return { ...post, ...likedPost, likes: post.likes++ }
      }
      return post;
    })

    this.setState({
      posts: updatedPosts
    })
  }

  handleDeletePostMessage = deletedPost => {
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post._id !== deletedPost._id)
    }));
  }

  loadPosts = async () => {
    let response = await axios.get(process.env.REACT_APP_API_URL + "/posts");
    this.setState({ posts: response.data }, () => {
      this.setState({
        postsFiltered: this.state.posts,
      });
    })
  };

  createPost = async (post) => {
    this.setState({ loading: true });

    let newPost = await axios.get(process.env.REACT_APP_API_URL + "/posts/newEmpty");   
    newPost = {...newPost.data, ...post, author: process.env.REACT_APP_EOS_ACCOUNT};

    this.setState({ posts: [...this.state.posts, newPost] });

    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'createpost', {
        author: process.env.REACT_APP_EOS_ACCOUNT,
        ...newPost
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  deletePost = (contractPkey, _id, e) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post._id !== _id)
    }));

    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'deletepost',
        {
          contractPkey,
          _id
        })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  editPost = (post, e) => {
    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'editpost',
        {
          ...post
        })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  likePost = (contractPkey, _id, e) => {
    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'likepost', {
          contractPkey,
          _id
        })
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  // Toggle if create window is open or not
  toggleCreate = () => {
    this.setState({
      createOpen: !this.state.createOpen
    });
  }

  // Fuzzy Search via Fuse.js
  handleKeyPress = (event) => {
    if (event.target.value !== "" ) {
      const enter = () => {
        if(event.key === "Enter"){
          keyUp()
        }
      }
      const keyUp = () => {
        var fuse = new Fuse(this.state.posts, fuseConfig)
        this.setState({
          filters: event.target.value,
          postsFiltered: fuse.search(event.target.value).slice(0,this.state.returnedAmount),
        })
      }
      this.state.onEnter ? enter() : keyUp()
    } else {
      this.setState({
        postsFiltered: this.state.posts,
      })
    }
  }

  render() {
    return (
      <div className={ "layoutStandard " + (this.state.createOpen ? 'createOpen' : '') }>
        <div className="logo">
          <a href="/"><img src={Logo} alt="Eos.io"/></a>
        </div>
        <div className="search">
          <input
            placeholder="Search"
            onKeyUp={this.handleKeyPress}
          />
        </div>
        <div className="main">
          <div className="toggleCreate" onClick={this.toggleCreate}>
            <span></span>
            <span></span>
          </div>
          <CreatePost createPost={this.createPost} toggleCreate={this.toggleCreate} />
          <div className="cards">
            <Posts
              posts={this.state.postsFiltered}
              deletePost={this.deletePost}
              editPost={this.editPost}
              likePost={this.likePost}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
