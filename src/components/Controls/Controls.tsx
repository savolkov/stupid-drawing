import React from 'react';
import './Controls.css';
import { isNull } from 'util';

class Controls extends React.Component {
    constructor(props: any) {
        super(props);
        this.drawLine = this.drawLine.bind(this);
    }
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    drawLine() {
        const c: any = document.getElementById("stupidCanvas");
        if (isNull(c)) return;
        var ctx = c.getContext("2d");
        const canvasWidth: number = c.width;
        const canvasHeight: number = c.height;
        ctx.moveTo(this.getRandomInt(0, canvasWidth), this.getRandomInt(0, canvasHeight));
        ctx.lineTo(this.getRandomInt(0, canvasWidth), this.getRandomInt(0, canvasHeight));
        ctx.stroke();
    }

    clearCanvas() {
        
    }

    render() {
        return<div className="controls">
            <button onClick = {this.drawLine} className="controls__btn">Draw Line</button>
            <button onClick = {this.clearCanvas} className="controls__btn">Clear Canvas</button>
        </div>
    }
}

export default Controls;
