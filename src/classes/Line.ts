import Point from './Point';
import Primitive from './Primitive';

export default class Line extends Primitive {
  constructor(id: number, name: string, startPoint: Point, endPoint: Point) {
    super(id, name);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }


  startPoint: Point;

  endPoint: Point;
}
