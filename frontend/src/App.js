import React, { Component } from 'react';
import Fuse from "fuse.js"

import fuseConfig from "./fuseConfig";
import EOSClient from './lib/eos-client';
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
    const contractAccount = process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_CONTRACT_ACCOUNT : process.env.REACT_APP_EOS_TEST_CONTRACT_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);
    this.loadPosts();
  }

  loadPosts = () => {
    this.eos
      .getTableRows('post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
        this.setState({
          postsFiltered: this.state.posts,
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  createPost = post => {
    this.setState({ loading: true });

    this.setState({ posts: [...this.state.posts, post] });

    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'createpost', {
        author: process.env.REACT_APP_EOS_CONTRACT_ACCOUNT,
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

  deletePost = (pkey, e) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter((post, index) => post.pkey !== pkey)
    }));

    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'deletepost',
        {
          pkey
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

  likePost = (pkey, e) => {
    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'likepost', {
          pkey
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
