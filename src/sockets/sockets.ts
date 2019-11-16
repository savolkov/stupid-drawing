import {
  addLineAction, changeLineAction, clearCanvasAction, removeLineAction,
} from '../actions/lineActions';
import Line from '../classes/Line';
import Point from '../classes/Point';

export default function setupSocket(dispatch: any) {
  const socket = new WebSocket('wss://stupid-drawing-stage.herokuapp.com:1337');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    let line: Line;
    let oldLine: Line;
    let newLine: Line;
    switch (data.type) {
      case 'ADD_LINE':
        line = new Line(data.line.id,
          data.line.name,
          data.line.startPoint,
          data.line.endPoint,
          data.line.color);
        dispatch(addLineAction(line, true));
        break;
      case 'REMOVE_LINE':
        line = new Line(data.line.id,
          data.line.name,
          data.line.startPoint,
          data.line.endPoint,
          data.line.color);
        dispatch(removeLineAction(line, true));
        break;
      case 'CHANGE_LINE':
        oldLine = new Line(data.oldLine.id,
          data.oldLine.name,
          new Point(data.oldLine.startPoint.x,
            data.oldLine.startPoint.y,
            data.oldLine.startPoint.z),
          new Point(data.oldLine.endPoint.x,
            data.oldLine.endPoint.y,
            data.oldLine.endPoint.z),
          data.oldLine.color);
        newLine = new Line(data.newLine.id,
          data.newLine.name,
          new Point(data.newLine.startPoint.x,
            data.newLine.startPoint.y,
            data.newLine.startPoint.z),
          new Point(data.newLine.endPoint.x,
            data.newLine.endPoint.y,
            data.newLine.endPoint.z),
          data.newLine.color);
        dispatch(changeLineAction(oldLine, newLine, true));
        break;
      case 'CLEAR_CANVAS':
        dispatch(clearCanvasAction(true));
        break;
      default:
        break;
    }
  };
  return socket;
}
