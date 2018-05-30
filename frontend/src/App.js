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
    this.eos = Eos.Localnet(EOS_CONFIG.clientConfig);
    this.loadPosts();
  }

  loadPosts = () => {
    this.eos
      .getTableRows(true, 'blog', 'blog', 'post')
      .then(data => {
        console.log(data);
        this.setState({ posts: data.rows });
      })
      .catch(e => {
        console.error(e);
      });
  };

  createPost = post => {
    this.setState({ loading: true });

    const newPost = {
      title: post.title,
      content: post.content,
      tag: post.tag
    };

    this.setState({ posts: [newPost, this.state.posts.concat()] });

    this.eos.contract('blog').then(blog => {
      blog
        .createpost('blog', newPost.title, newPost.content, newPost.tag, {
          authorization: 'blog'
        })
        .then(res => {
          console.log(res);
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
    });

    // this.eos
    //   .transaction({
    //     actions: [
    //       {
    //         account: 'blog',
    //         name: 'createpost',
    //         authorization: [
    //           {
    //             actor: 'blog',
    //             permission: 'active'
    //           }
    //         ],
    //         data: {
    //           author: 'blog',
    //           title: newPost.title,
    //           content: newPost.content,
    //           tag: newPost.tag
    //         }
    //       }
    //     ]
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ loading: false });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //     console.log(err);
    //   });
  };

  deletePost = (pkey, e) => {
    console.log(pkey);
  };

  editPost = (pkey, e) => {
    console.log(pkey);
  };

  likePost = (pkey, e) => {
    console.log(pkey);
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
