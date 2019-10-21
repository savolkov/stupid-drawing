import React from 'react';
import './DrawZone.css';

type Props = {
  data: any[],
};

class DrawZone extends React.Component<Props> {
  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    c.style.width = '100%';
    c.style.height = '100%';
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  }

  render() {
    return (
      <div className="drawZone">
        <canvas id="stupidCanvas" className="stupidCanvas" />
      </div>
    );
  }
}

export default DrawZone;
