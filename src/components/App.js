import React, { Component } from "react";

import axios from "axios";

import "./App.css";
import Post from "./Post/Post";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      filterString: "",
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then((res) => {
      this.setState({ posts: res.data });
    });
  }

  updatePost(postId, content) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${postId}`, {
        text: content,
      })
      .then((res) => {
        this.setState({ posts: res.data });
      });
  }

  deletePost(postId) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${postId}`)
      .then((res) => {
        this.setState({ posts: res.data });
      });
  }

  createPost(content) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, {
        text: content,
      })
      .then((res) => {
        this.setState({ posts: res.data });
      });
  }

  filterSearch(text) {
    text = decodeURI(text);
    this.setState({
      filterString: text,
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterSearchFn={this.filterSearch} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts
            .filter((value) =>
              value.text
                .toLowerCase()
                .includes(this.state.filterString.toLowerCase())
            )
            .map((post) => (
              <Post
                key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
              />
            ))}
        </section>
      </div>
    );
  }
}

export default App;
