/**
 * @class Layer
 */
import * as React from 'react'
import styles from '../css/layer.css'

import { GlobalLayerProps } from '.';
import { CommentDiv } from './comment-div';
import { CommentData } from '../comment-data';

interface Props extends GlobalLayerProps {
}

interface State {
  width: number;
  height: number;
}

export class Layer extends React.Component<Props, State> {
  private static DEFAULT_DURATION = 4000;

  private stageRef:React.RefObject<HTMLDivElement>
  constructor(props:Props) {
    super(props);
    this.stageRef = React.createRef<HTMLDivElement>();
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    // Let's measure our active area
    if (this.stageRef.current !== null) {
      this.setState({
        width: this.stageRef.current.offsetWidth,
        height: this.stageRef.current.offsetHeight
      })
    }
  }

  renderComments() {
    return this.props.comments.filter((data:CommentData) => {
      const duration = data.duration ? data.duration : Layer.DEFAULT_DURATION;
      return this.props.time >= data.startTime &&
        (this.props.time - data.startTime <= duration);
    }).map((data:CommentData) => {
      const duration = data.duration ? data.duration : Layer.DEFAULT_DURATION;
      const ttl = duration - (this.props.time - data.startTime);
      return <CommentDiv key={ data.id }
        duration={ duration }
        ttl={ ttl }
        parentWidth={ this.state.width }
        moving={ this.props.renderState === 'animated' }
        text={ data.text }/>;
    });
  }

  render() {
    return (
      <div ref={ this.stageRef } className={styles.layer}>
        { this.renderComments() }
      </div>
    );
  }
}
