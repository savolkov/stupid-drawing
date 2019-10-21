import React from 'react';
import './DrawZone.css';
import Line from "../../classes/Line";

interface Props {
  data: any[],
}

const DrawZone = class extends React.Component<Props> {
  ctx: any;

  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    c.style.width = '100%';
    c.style.height = '100%';
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    this.ctx = c.getContext('2d');
  }

  componentDidUpdate() {
    const { data } = this.props;
    // const c: HTMLCanvasElement | null = document.getElementById('stupidCanvas') as HTMLCanvasElement;
    //     // if (!c) return;
    //     // const ctx = c.getContext('2d') as any;

    const { ctx } = this;
    if (!data.length) {
      ctx.clearRect(0, 0, 943, 475);
    }
    data.forEach((item) => {
      if (item.constructor.name === 'Line') {
        if (item.highlighted) {
          this.highLightLine(item);
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

  render() {
    return (
      <div className="drawZone">
        <canvas
          id="stupidCanvas"
          className="stupidCanvas"
          onMouseMove={this.onMouseMoveHandler}
        />
      </div>
    );
  }
}

// @ts-ignore
DrawZone.displayName = 'DrawZone';
export default DrawZone;
