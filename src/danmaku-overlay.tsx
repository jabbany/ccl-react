/**
 * @class DanmakuOverlay
 */
import * as React from 'react'
import styles from './css/overlay.css'

import { CommentAllocator } from './allocators'
import { Layer, CanvasLayer } from './layers';
import { CommentData } from './comment-data';

/** Props to be accessed outside **/
export type RenderType = 'dom' | 'canvas';
export type PlayStatus = 'playing' | 'stopped';

export type Props = {
  allocators: CommentAllocator[];
  status: PlayStatus;
  time: number;
  renderer?: RenderType;
}

interface State {
  comments: CommentData[];
}

export class DanmakuOverlay extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      comments:[
        {'id': 'foo', 'text': 'bar', 'startTime': 0}
      ]
    };
  }

  componentDidMount() {
  }

  renderCommentLayers() {
    // Get the render state
    const renderState = this.props.status === 'stopped' ? 'frozen' : 'animated';
    return this.props.allocators.map((allocator:CommentAllocator) => {
      if (this.props.renderer === 'canvas') {
        return <CanvasLayer key={ allocator.id } allocator={ allocator }
          renderState={ renderState }
          comments={ this.state.comments }
          time={ this.props.time } />
      } else {
        // Always fall back to using the DOM renderer
        return <Layer key={ allocator.id } allocator={ allocator }
          renderState={ renderState }
          comments={ this.state.comments }
          time={ this.props.time }/>
      }
    })
  }

  render() {
    const { allocators, status, children, time, ...rest } = this.props;
    return (
      <div className={ styles.overlay } {...rest}>
        { children }
        { this.renderCommentLayers() }
      </div>
    );
  }
}
