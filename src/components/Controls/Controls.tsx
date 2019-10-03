import React from 'react';
import './Controls.css';
import { isNull } from 'util';

type Props = {
};

class Controls extends React.Component<Props> {
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
        const c: HTMLCanvasElement | null = document.getElementById("stupidCanvas") as HTMLCanvasElement;
        if (isNull(c)) return;
        var ctx = c.getContext("2d") as any;
        const canvasWidth: number = c.width;
        const canvasHeight: number = c.height;
        ctx.beginPath();
        ctx.moveTo(this.getRandomInt(0, canvasWidth), this.getRandomInt(0, canvasHeight));
        ctx.lineTo(this.getRandomInt(0, canvasWidth), this.getRandomInt(0, canvasHeight));
        ctx.strokeStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        ctx.stroke();
    }

    clearCanvas() {
        const c: HTMLCanvasElement | null = document.getElementById("stupidCanvas") as HTMLCanvasElement;
        if (isNull(c)) return;
        var ctx = c.getContext("2d") as any;
        const canvasWidth: number = c.width;
        const canvasHeight: number = c.height;
 
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    render() {
        return <div className="controls">
            <button onClick = {this.drawLine} className="controls__btn">Draw Line</button>
            <button onClick = {this.clearCanvas} className="controls__btn">Clear Canvas</button>
        </div>
    }
}

export default Controls;
