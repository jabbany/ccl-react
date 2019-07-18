/**
 * @class CommentDiv
 */
import * as React from 'react'
import styles from '../css/layer.css'

interface Props {
  text:string;
}



export class CommentDiv extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
  }

  render() {
    const elementStyle = {};

    return (
      <div className={ styles.comment } style={ elementStyle }>
        { this.props.text }
      </div>
    );
  }
}
