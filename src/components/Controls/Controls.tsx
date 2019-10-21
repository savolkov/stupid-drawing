import React from 'react';
import './Controls.css';
import Line from '../../classes/Line';
import Point from '../../classes/Point';

type Props = {
  updateData: any;
};

const Controls = class extends React.Component<Props> {
  randomIntInBounds = (lower: number, upper: number) => {
    const min: number = Math.ceil(lower);
    const max: number = Math.floor(upper);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addLine = () => {
    const canvasHeight = 100;
    const canvasWidth = 100;
    const startPoint = new Point(this.randomIntInBounds(0, canvasWidth), this.randomIntInBounds(0, canvasHeight), 0);
    const endPoint = new Point(this.randomIntInBounds(0, canvasWidth), this.randomIntInBounds(0, canvasHeight), 0);
    const line = new Line(0, '', startPoint, endPoint);
    this.props.updateData(line);
  }

  clearCanvas = () => {
    this.props.updateData(null);
  }

  render() {
    return (
      <div className="controls">
        <button className="controls__btn">Draw Line</button>
        <button onClick={this.clearCanvas} className="controls__btn">Clear Canvas</button>
      </div>
    );
  }
};

export default Controls;
