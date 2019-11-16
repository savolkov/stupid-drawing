import Line from '../classes/Line';

export const addLineAction = (line: Line, isFromSocket: boolean = false) => ({
  type: 'ADD_LINE',
  line,
  isFromSocket,
});

export const removeLineAction = (line: Line, isFromSocket: boolean = false) => ({
  type: 'REMOVE_LINE',
  line,
  isFromSocket,
});

export const changeLineAction = (oldLine: Line, newLine: Line, isFromSocket: boolean = false) => ({
  type: 'CHANGE_LINE',
  oldLine,
  newLine,
  isFromSocket,
});

export const clearCanvasAction = (isFromSocket: boolean = false) => ({
  type: 'CLEAR_CANVAS',
  isFromSocket,
});
