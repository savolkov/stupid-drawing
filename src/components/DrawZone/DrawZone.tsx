import React from 'react';
import './DrawZone.css';

interface Props {
  data: any[],
}

const DrawZone = class extends React.Component<Props> {
  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    c.style.width = '100%';
    c.style.height = '100%';
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  }

  componentDidUpdate() {
    const { data } = this.props;
    const c: HTMLCanvasElement | null = document.getElementById('stupidCanvas') as HTMLCanvasElement;
    if (!c) return;
    const ctx = c.getContext('2d') as any;
    if (!data.length) {
      ctx.clearRect(0, 0, 943, 475);
    }
    data.forEach((item) => {
      if (item.constructor.name === 'Line') {
        ctx.beginPath();
        ctx.moveTo(item.startPoint.x, item.startPoint.y);
        ctx.lineTo(item.endPoint.x, item.endPoint.y);
        // eslint-disable-next-line no-bitwise
        ctx.strokeStyle = item.color
        ctx.stroke();
      }
    });
  }

  render() {
    return (
      <div className="drawZone">
        <canvas id="stupidCanvas" className="stupidCanvas" />
      </div>
    );
  }
}

// @ts-ignore
DrawZone.displayName = 'DrawZone';
export default DrawZone;
