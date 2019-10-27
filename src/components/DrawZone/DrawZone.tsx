import React from 'react';
import './DrawZone.css';
import { connect } from 'react-redux';
import Line from '../../classes/Line';
import Point from '../../classes/Point';
import { changeLineAction } from '../../actions/lineActions';


interface Props {
  data: Line[];
  changeLineAction: typeof changeLineAction,
}

const DrawZone = class extends React.Component<Props> {
  ctx: any;

  cWidth: number;

  cHeight: number;

  dragging: boolean;

  highlightedLine: Line | null;

  startPoint: Point | null;

  constructor(props: Props) {
    super(props);
    this.dragging = false;
    this.highlightedLine = null;
    this.ctx = null;
    this.startPoint = null;
    this.cWidth = 0;
    this.cHeight = 0;
  }

  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    c.style.width = '100%';
    c.style.height = '100%';
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    this.ctx = c.getContext('2d');
    this.cWidth = c.width;
    this.cHeight = c.height;
  }

  componentDidUpdate() {
    const { data } = this.props;
    const { cWidth, cHeight } = this;
    const { ctx } = this;
    ctx.clearRect(0, 0, cWidth, cHeight);
    data.forEach((item: any) => {
      if (item instanceof Line) {
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
    if (this.dragging) {
      this.moveLine(e, true);
      return;
    }
    data.forEach((item: any) => {
      if (item instanceof Line) {
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
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;
    if (this.highlightedLine && this.highlightedLine.isOnLine(startX, startY)) {
      this.startPoint = new Point(startX, startY, 0);
      this.dragging = true;
      return;
    }
    this.highlightedLine = null;
    this.startPoint = null;
  }

  moveLine = (e: any, moveWhileDragging: Boolean) => {
    const { props } = this;
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

      const newLine = new Line(1, '', newSP, newEP);
      newLine.color = this.highlightedLine.color;
      if (this.highlightedLine && this.dragging) {
        props.changeLineAction(this.highlightedLine, newLine);
        this.highlightedLine = newLine;
        this.startPoint = new Point(endX, endY, 0);
      }
    }
    if (moveWhileDragging) return;
    this.highlightedLine = null;
    this.startPoint = null;
    this.dragging = false;
  }

  endDrag = (e: any) => {
    this.moveLine(e, false);
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
};

const mapStateToProps = (state: any) => {
  const data = state.linesState;
  return { data };
}

// @ts-ignore
DrawZone.displayName = 'DrawZone';
export default connect(
  mapStateToProps,
  { changeLineAction },
)(DrawZone);
