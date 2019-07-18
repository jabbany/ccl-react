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



export class Layer extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
  }

  renderComments() {
    return this.props.comments.map((data:CommentData) => {
      return <CommentDiv text={ data.text }/>
    });
  }

  render() {
    return (
      <div className={styles.layer}>
        { this.renderComments() }
      </div>
    );
  }
}
