import React from 'react';
import './DrawZone.css';
import Line from "../../classes/Line";
import Point from "../../classes/Point";

interface Props {
  data: any[],
}

const DrawZone = class extends React.Component<Props> {
  ctx: any;

  dragging: boolean;

  highlightedLine: Line | null;

  startPoint: Point | null;

  constructor(props: Props) {
    super(props);
    this.dragging = false;
    this.highlightedLine = null;
    this.ctx = null;
    this.startPoint = null;
  }

  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    c.style.width = '100%';
    c.style.height = '100%';
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    this.ctx = c.getContext('2d');
  }

  componentDidUpdate() {
    console.log("didUpdate");
    const { data } = this.props;
    const { ctx } = this;
    //if (!data.length) {
      ctx.clearRect(0, 0, 943, 475);
    //}
    data.forEach((item) => {
      if (item.constructor.name === 'Line') {
        if (item.highlighted) {
          this.highLightLine(item);
          this.highlightedLine = item;
          return;
        }
        this.unHighLightLine(item);
      }
    });
  }

  onMouseMoveHandler = (e: any) => {
    const userX = e.nativeEvent.offsetX;
    const userY = e.nativeEvent.offsetY;
    const { data } = this.props;
    if (!data.length) return;
    data.forEach((item) => {
      if (item.constructor.name === 'Line') {
        if (item.isOnLine(userX, userY)) {
          this.highLightLine(item);
        } else {
          this.unHighLightLine(item);
        }
      }
    });
  };

  highLightLine = (line: Line) => {
    const { ctx } = this;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    // eslint-disable-next-line no-bitwise
    ctx.strokeStyle = line.color;
    ctx.stroke();
    this.highlightedLine = line;
  }

  unHighLightLine = (line: Line) => {
    const { ctx } = this;
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    // eslint-disable-next-line no-bitwise
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.moveTo(line.startPoint.x, line.startPoint.y);
    ctx.lineTo(line.endPoint.x, line.endPoint.y);
    // eslint-disable-next-line no-bitwise
    ctx.strokeStyle = line.color;
    ctx.stroke();
  }

  startDrag = (e: any) => {
    console.log(e);
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;
    if (this.highlightedLine && this.highlightedLine.isOnLine(startX, startY)) {
      this.startPoint = new Point(startX, startY, 0);
      return;
    }
    this.highlightedLine = null;
    this.startPoint = null;
  }

  endDrag = (e: any) => {
    console.log(e);
    const { data } = this.props;
    const endX = e.nativeEvent.offsetX;
    const endY = e.nativeEvent.offsetY;
    if (this.highlightedLine && this.startPoint) {
      const dX = endX - this.startPoint.x;
      const dY = endY - this.startPoint.y;
      const newSP = new Point(
        this.highlightedLine.startPoint.x + dX,
        this.highlightedLine.startPoint.y + dY,
        0,
      );
      const newEP = new Point(
        this.highlightedLine.endPoint.x + dX,
        this.highlightedLine.endPoint.y + dY,
        0,
      );
      data.forEach((itm, i) => {
        if (itm.constructor.name !== 'Line') return;
        if (itm === this.highlightedLine) {
          data[i].startPoint = newSP;
          data[i].endPoint = newEP;
        }
      });
      this.setState(data);
    }
    this.highlightedLine = null;
    this.startPoint = null;
  }

  render() {
    return (
      <div className="drawZone">
        <canvas
          id="stupidCanvas"
          className="stupidCanvas"
          onMouseMove={this.onMouseMoveHandler}
          onMouseDown={this.startDrag}
          onMouseUp={this.endDrag}
        />
      </div>
    );
  }
}

// @ts-ignore
DrawZone.displayName = 'DrawZone';
export default DrawZone;
