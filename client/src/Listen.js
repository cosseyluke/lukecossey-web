import React, { Component } from 'react';
import ReactDOM from "react-dom";
import YoutubeEmbedVideo from "youtube-embed-video";
import './Listen.scss'


class ListenPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videoId: "2chfsFTNEXw",
    }
  }

  render() {
    return (
      <section className='listen-page'>
        <div className="video-wrap">
          <YoutubeEmbedVideo videoId={this.state.videoId} autoplay={true} enhancedPrivacy={true} showInfo={false} controls={false} suggestions={false} />
        </div>
      </section>
    )
  }
}

export { ListenPage };
