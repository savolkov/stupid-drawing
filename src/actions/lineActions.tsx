import Line from '../classes/Line';

export const addLineAction = (line: Line) => ({
  type: 'ADD_LINE',
  line,
});

export const removeLineAction = (line: Line) => ({
  type: 'REMOVE_LINE',
  line,
});

export const changeLineAction = (oldLine: Line, newLine: Line) => ({
  type: 'CHANGE_LINE',
  oldLine,
  newLine,
});

export const clearCanvasAction = () => ({
  type: 'CLEAR_CANVAS',
});
