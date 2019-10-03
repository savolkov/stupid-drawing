import React from 'react';
import './DrawZone.css';

class DrawZone extends React.Component {
    componentDidMount() {
        const c: any = document.getElementById("stupidCanvas");
        c.style.width = '100%';
        c.style.height = '100%';
        c.width  = c.offsetWidth;
        c.height = c.offsetHeight;
    }

    render() {
        return <div className="drawZone">
            <canvas id="stupidCanvas" className="stupidCanvas"></canvas>
            </div>;
    }

}

export default DrawZone;
