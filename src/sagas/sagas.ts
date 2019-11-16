import { takeEvery, takeLatest, all } from 'redux-saga/effects';

function* addLine(socket: any, action: any) {
  if (!action.isFromSocket) {
    yield socket.socket.send(JSON.stringify(action));
  }
}

function removeLine(socket: any, action: any) {
  if (!action.isFromSocket) {
    // eslint-disable-next-line no-param-reassign
    action.oldLine.highlighted = false;
    socket.socket.send(JSON.stringify(action));
  }
}

function changeLine(socket: any, action: any) {
  if (!action.isFromSocket) {
    socket.socket.send(JSON.stringify(action));
  }
}

function clearCanvas(socket: any, action: any) {
  if (!action.isFromSocket) {
    socket.socket.send(JSON.stringify(action));
  }
}

function* watchLineActions(params: any) {
  console.log('watchLineActions');
  console.log(params);
  yield takeEvery('ADD_LINE', addLine, params);
  yield takeEvery('REMOVE_LINE', removeLine, params);
  yield takeEvery('CHANGE_LINE', changeLine, params);
  yield takeEvery('CLEAR_CANVAS', clearCanvas, params);

}

export default function* rootSaga(params: any) {
  yield all([
    watchLineActions(params),
  ]);
}
