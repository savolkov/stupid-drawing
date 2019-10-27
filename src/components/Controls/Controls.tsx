import React from 'react';
import './Controls.css';
import { connect } from 'react-redux';
import Line from '../../classes/Line';
import Point from '../../classes/Point';
import { addLineAction, clearCanvasAction } from '../../actions/lineActions';

interface Props {
  addLineAction: typeof addLineAction,
  clearCanvasAction: typeof clearCanvasAction,
}

const Controls = class extends React.Component<Props> {

  cWidth: number;

  cHeight: number;

  constructor(props: Props) {
    super(props);
    this.cWidth = 0;
    this.cHeight = 0;
  }

  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    this.cHeight = c.height;
    this.cWidth = c.width;
  }

  randomIntInBounds = (lower: number, upper: number) => {
    const min: number = Math.ceil(lower);
    const max: number = Math.floor(upper);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addLine = () => {
    const { props } = this;
    const canvasHeight = this.cHeight;
    const canvasWidth = this.cWidth;
    const startPoint = new Point(
      this.randomIntInBounds(0, canvasWidth),
      this.randomIntInBounds(0, canvasHeight),
      0,
    );
    const endPoint = new Point(
      this.randomIntInBounds(0, canvasWidth),
      this.randomIntInBounds(0, canvasHeight),
      0,
    );
    const line = new Line(0, '', startPoint, endPoint);
    props.addLineAction(line);
  }

  clearCanvas = () => {
    const { props } = this;
    props.clearCanvasAction();
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.addLine} type="button" className="controls__btn">Draw Line</button>
        <button onClick={this.clearCanvas} type="button" className="controls__btn">Clear Canvas</button>
      </div>
    );
  }
};

// @ts-ignore
Controls.displayName = 'Controls';
export default connect(
  null,
  { addLineAction, clearCanvasAction },
)(Controls);
