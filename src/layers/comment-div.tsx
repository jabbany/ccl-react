/**
 * @class CommentDiv
 */
import * as React from 'react'
import styles from '../css/layer.css'

interface Props {
  text:string;
  duration:number;
  ttl:number;
  parentWidth:number;
  moving:boolean;
}

interface State {
  width:number;
}

export class CommentDiv extends React.Component<Props, State> {
  private commentRef:React.RefObject<HTMLDivElement>;
  constructor(props:Props) {
    super(props);
    this.commentRef = React.createRef<HTMLDivElement>();
    this.state = {
      width: 0
    }
  }

  componentDidMount() {
    if (this.commentRef.current !== null) {
      this.setState({
        width: this.commentRef.current.offsetWidth
      });
    }
  }

  render() {
    const totalWidth = this.props.parentWidth + this.state.width;
    const remaining = this.props.ttl / this.props.duration;
    const x = remaining * totalWidth - this.state.width;
    const elementStyle:React.CSSProperties = {
      left: x
    };
    if (this.props.moving) {
      elementStyle.transition = `transform ${this.props.ttl}ms linear`;
      elementStyle.transform = `translateX(${- x - this.state.width}px)`;
    }

    return (
      <div ref={ this.commentRef }
        className={ styles.comment } style={ elementStyle }>

        { this.props.text }
      </div>
    );
  }
}
