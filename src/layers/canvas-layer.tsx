/**
 * @class CanvasLayer
 */
import * as React from 'react'
import styles from '../css/layer.css'

import { GlobalLayerProps } from '.';

interface Props extends GlobalLayerProps {

}

export class CanvasLayer extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
  }

  render() {
    return (
      <div className={ styles.layer }>
        <canvas>
          <p>Canvas not supported!</p>
        </canvas>
      </div>
    );
  }
}
