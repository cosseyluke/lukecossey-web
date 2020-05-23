import React, { Component } from 'react';
import './Post.scss';

class PostIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiResponse: "",
    }
  }

  callAPI() {
    fetch("http://localhost:9000/posts")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}))
      .catch(err => err)
  }

  componentDidMount() {
    this.callAPI()
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.state.apiResponse}
        </p>
      </div>
    );
  }
}

export { PostIndex };
