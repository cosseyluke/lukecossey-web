import React, { Component } from 'react';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { AllHtmlEntities } from 'html-entities';
import { format } from 'date-fns'
import isodate from 'isodate'
import './Post.scss'

const API_URL = process.env.API_URL


class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objUrl: `/log/${this.props.post.slug}`
    }
  }

  getUrl() {
    return `/log/${this.props.post.slug}`
  }

  render () {
    const pubDate = format(isodate(this.props.post.pub_date), 'MMMM d, y')

    return (
      <div className="post-listing listing-default" key={this.key}>
        <div className="post-date-wrap">{pubDate}</div>
        <div className="text-wrap">
          <div className="title-wrap">
            <h4><Link to={this.getUrl()}>{this.props.post.title}</Link></h4>
            <p className="date">{pubDate}</p>
          </div>
        </div>
      </div>
    )
  }
}

class PostList extends Component {
  render() {
    return (
      <div className="post-list">
        {this.props.posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    )
  }
}

class PostIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  callAPI() {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(res => {this.setState({posts: res})})
      .catch(err => err)
  }

  componentDidMount() {
    this.callAPI()
  }

  render() {
    const posts = this.state.posts

    return (
      <div className="post-index-page">
        <div className="post-list-wrap">
          <PostList posts={posts} />
        </div>
      </div>
    );
  }
}

class PostBlock extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const entities = new AllHtmlEntities()
    const text = entities.decode(this.props.block.body)

    return (
      <div className="block-listing" key={this.key}>
        <div className="text">{parse(text)}</div>
      </div>
    )
  }
}

class PostBlockList extends Component {
  render() {
    return (
      <div className="block-list">
        {this.props.blocks.map((block) => (
          <PostBlock block={block} key={block._id} />
        ))}
      </div>
    )
  }
}

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }
  }

  callAPI() {
    fetch(`${API_URL}/posts/${this.props.match.params.slug}`)
      .then(res => res.json())
      .then(res => this.setState({post: res}))
      .catch(err => err)
  }

  componentDidMount() {
    this.callAPI()
  }

  render() {
    if (this.state.post) {
      const pubDate = format(isodate(this.state.post.pub_date), 'MMMM d, y')
      const entities = new AllHtmlEntities()
      const intro = entities.decode(this.state.post.intro)

      return (
        <section className='blog-post'>
          <div className="post-wrap">
            <div className="post-date-wrap">
              <div className="date">{pubDate}</div>
            </div>
            <div className="post-content-wrap">
              <div className="post-title title-wrap">
                <h3 className="fontSize-m">{this.state.post.title}</h3>
      					<div className="date">{pubDate}</div>
              </div>
              <div className="intro-wrap"><div className="text">{parse(intro)}</div></div>
              <PostBlockList blocks={this.state.post.blocks} />
            </div>
          </div>
        </section>
      )
    }

    return (<section className='blog-post'/>)
  }
}

export { PostDetail, PostIndex };
