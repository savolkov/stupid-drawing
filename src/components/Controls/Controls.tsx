import React from 'react';
import './Controls.css';
import Line from '../../classes/Line';
import Point from '../../classes/Point';

interface Props {
  updateData(data: any): void;
}

const Controls = class extends React.Component<Props, {}> {

  randomIntInBounds = (lower: number, upper: number) => {
    const min: number = Math.ceil(lower);
    const max: number = Math.floor(upper);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addLine = () => {
    const { updateData } = this.props;
    const canvasHeight = 475;
    const canvasWidth = 943;
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
    updateData(line);
  }

  clearCanvas = () => {
    const { updateData } = this.props;
    updateData([]);
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
export default Controls;
