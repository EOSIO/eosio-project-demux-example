import React, { Component } from 'react';
import Eos from 'eosjs';

import CreatePost from './CreatePost/CreatePost';
import Posts from './Posts/Posts';
import './App.css';

const EOS_CONFIG = {
  contractName: 'blog', // Contract name
  contractSender: 'blog', // User executing the contract (should be paired with private key)
  clientConfig: {
    keyProvider: ['<Private Key>'], // Your private key
    httpEndpoint: 'http://127.0.0.1:8888' // EOS http endpoint
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: []
    };
    this.eosClient = Eos.Localnet(EOS_CONFIG.clientConfig);
    this.loadPosts();
  }

  onSubmit = () => {
    console.log('Sd');
  };

  loadPosts() {
    this.eosClient
      .getTableRows(true, 'blog', 'blog', 'post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
      })
      .catch(e => {
        console.error(e);
      });
  }

  createPost(description) {
    this.setState({ loading: true });
  }

  deletePost(id, e) {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Blogs</h1>
        </header>
        <div className="App-intro">
          <Posts posts={this.state.posts} deletePost={this.deletePost} />
          <CreatePost createPost={this.createPost} />
        </div>
      </div>
    );
  }
}

export default App;
