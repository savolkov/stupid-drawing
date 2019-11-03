// eslint-disable-next-line import/prefer-default-export
export const setMousePosAction = (x: number, y: number, eq: string|null) => ({
  type: 'SET_MOUSE_POS',
  x,
  y,
  eq,
});
