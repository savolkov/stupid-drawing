import Point from './Point';
import Primitive from './Primitive';

export default class Line extends Primitive {
  constructor(id: number, name: string, startPoint: Point, endPoint: Point) {
    super(id, name);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    // eslint-disable-next-line no-bitwise
    this.color = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
  }


  startPoint: Point;

  color: string;

  endPoint: Point;
}
