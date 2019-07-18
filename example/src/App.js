import React, { Component } from 'react'

import { DanmakuOverlay } from 'ccl-react'

export default class App extends Component {

  togglePlay(play:boolean = !this.refs.videoPlayer.paused) {
    console.log(play);
    if (play) {
      this.refs.videoPlayer.play();
    } else {
      this.refs.videoPlayer.pause();
    }
  }

  render () {
    return (
      <div>
        <DanmakuOverlay allocators={ [{}] } status={ 'playing' } onClick={ this.togglePlay }>
          <video ref="videoPlayer" autobuffer="true" data-setup="{}" width="800" height="450">
            <source src="//static.cdn.moe/ccltestingvideos/otsukimi_recital.mp4" type="video/mp4" />
            <source src="//static.cdn.moe/ccltestingvideos/otsukimi_recital.webm" type="video/webm" />
            <p>Your browser does not support html5 video!</p>
          </video>
        </DanmakuOverlay>
      </div>
    );
  }
}
