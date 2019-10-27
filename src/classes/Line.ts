import Point from './Point';
import Primitive from './Primitive';

export default class Line extends Primitive {
  constructor(id: number, name: string, startPoint: Point, endPoint: Point) {
    super(id, name);
    if (startPoint.x < endPoint.x) {
      this.startPoint = startPoint;
      this.endPoint = endPoint;
    } else {
      this.startPoint = endPoint;
      this.endPoint = startPoint;
    }

    // eslint-disable-next-line no-bitwise
    this.color = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    this.highlighted = false;
  }

  startPoint: Point;

  color: string;

  endPoint: Point;

  highlighted: boolean;

  isOnLine(x: number, y: number): boolean {
    const radius: number = 10;
    const x1 = this.startPoint.x;
    const x2 = this.endPoint.x;
    const y1 = this.startPoint.y;
    const y2 = this.endPoint.y;
    this.highlighted = ((Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1)
      / Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1))) < radius)
    && (x >= x1 && x <= x2)
    return this.highlighted;
  }

  isOnEnd(x: number, y: number): Point | null {
    const radius: number = 10;
    const x1 = this.startPoint.x;
    const x2 = this.endPoint.x;
    const y1 = this.startPoint.y;
    const y2 = this.endPoint.y;
    if ((Math.abs(x1 - x) < radius) && (Math.abs(y1 - y) < radius)) return this.startPoint;
    if ((Math.abs(x2 - x) < radius) && (Math.abs(y2 - y) < radius)) return this.endPoint;
    return null;
  }

  clone(): Line {
    const clone: Line = new Line(this.id, this.name, this.startPoint, this.endPoint);
    clone.color = this.color;
    return clone;
  }
}
