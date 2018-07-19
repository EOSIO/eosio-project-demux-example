import React, { Component } from 'react';
import axios from 'axios'
import io from 'socket.io-client';
import EOSClient from './lib/eos-client';
import CreatePost from './CreatePost/CreatePost';
import Posts from './Posts/Posts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: []
    };
    const contractAccount = process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_CONTRACT_ACCOUNT : process.env.REACT_APP_EOS_TEST_CONTRACT_ACCOUNT;
    this.eos = new EOSClient(contractAccount, contractAccount);
  }

  componentDidMount() {
    this.loadPosts();
    const socket = io(process.env.REACT_APP_WS_URL);
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }

  loadPosts = async () => {
    let response = await axios.get(process.env.REACT_APP_API_URL + "/posts");
    this.setState({ posts: response.data })
  };

  createPost = post => {
    this.setState({ loading: true });

    this.setState({ posts: [...this.state.posts, post] });

    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT,
        'createpost', {
        author: process.env.REACT_APP_EOS_ACCOUNT,
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

  deletePost = (_id, e) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter((post, index) => post._id !== _id)
    }));

    this.eos
      .transaction(process.env.REACT_APP_EOS_ACCOUNT,
        'deletepost', 
        {
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

  likePost = (_id, e) => {
    this.eos
      .transaction(
        process.env.REACT_APP_EOS_ACCOUNT, 
        'likepost', {
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

  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-1">
            <Posts
              posts={this.state.posts}
              deletePost={this.deletePost}
              editPost={this.editPost}
              likePost={this.likePost}
            />
            <CreatePost createPost={this.createPost} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
