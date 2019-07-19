import React, { Component } from 'react'
import styles from './index.css'

import { Container, Row, Col, Card } from "react-bootstrap";
import { DanmakuOverlay } from 'ccl-react';
import { BaseAllocator } from 'ccl-react';

class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.videoPlayer = React.createRef();
    this.lastSync = -1;
    this.state = {
      isPlaying: false,
      time: 0
    }
  }

  sync() {
    if (this.videoPlayer.current === null) {
      return; // Nothing to do
    }
    const player = this.videoPlayer.current;
    // Decide whether to sync or not
    let tdiff = Date.now() - this.lastSync;
    let tplay = player.currentTime * 1000 - this.state.time;
    let terr = Math.abs(tdiff - tplay);
    if (this.lastSync < 0 || terr > 10) {
      // Actually sync
      this.setState({
        time: player.currentTime * 1000
      });
      this.lastSync = Date.now();
    }
  }

  toggleVideoPlay(play:boolean = !this.state.isPlaying) {
    if (this.videoPlayer.current === null) {
      return; // Nothing to do
    }
    const player = this.videoPlayer.current;
    if (play) {
      player.play();
      this.setState({
        isPlaying: !player.paused,
        time: player.currentTime * 1000
      });
      this.lastSync = Date.now();
    } else {
      player.pause();
      this.setState({
        isPlaying: !player.paused,
        time: player.currentTime * 1000
      });
      this.lastSync = Date.now();
    }
  }

  render() {
    const { title, desc, sources, renderMode } = this.props;
    return (
      <Card>
        <DanmakuOverlay allocators={ [
          new BaseAllocator()
        ] }
          status={ this.state.isPlaying ? 'playing' : 'stopped' }
          renderer= { renderMode ? renderMode : 'dom' }
          onClick={ () => {this.toggleVideoPlay();} }
          time={ this.state.time }>
          <video ref={ this.videoPlayer } autobuffer="true"
            data-setup="{}" width="100%" height="100%"
            onTimeUpdate={ () => { this.sync(); } }>
            {
              sources.map((source) => {
                return <source key={source.url}
                  src={source.url} type={source.mime} />;
              })
            }
            <p>Your browser does not support html5 video!</p>
          </video>
        </DanmakuOverlay>
        <Card.Body>
          <Card.Title>{ title }</Card.Title>
          <Card.Text>
            { desc }
          </Card.Text>
        </Card.Body>
      </Card>);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.videoSources = [
      {
        url: '//static.cdn.moe/ccltestingvideos/otsukimi_recital.mp4',
        mime: 'video/mp4'
      },
      {
        url: '//static.cdn.moe/ccltestingvideos/otsukimi_recital.webm',
        mime: 'video/webm'
      }
    ]
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render () {
    return (
      <Container className={ styles.container }>
        <Row>
          <Col>
            <h1 className="mt-5"><code>ccl-react</code> Demo Application</h1>
            <p className="lead">
              Below you will see an example of an application built by
              incorporating <code>ccl-react</code>.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <VideoPlayer
              title="Example Video"
              desc="Click on the video to start playing or to pause it!"
              sources={ this.videoSources }/>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="lead">This page demonstrates </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
