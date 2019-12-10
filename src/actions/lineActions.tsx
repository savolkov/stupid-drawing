import Line from '../classes/Line';

export const addLineAction = (line: Line) => ({
  type: 'ADD_LINE',
  line,
});

export const removeLineAction = (id: string) => ({
  type: 'REMOVE_LINE',
  id,
});

export const changeLineAction = (id: string, newLine: Line) => ({
  type: 'CHANGE_LINE',
  id,
  newLine,
});

export const clearCanvasAction = () => ({
  type: 'CLEAR_CANVAS',
});
