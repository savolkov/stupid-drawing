const mouseReducer = (state = { x: 0, y: 0, eq: null }, action: any) => {
  if (action.type === 'SET_MOUSE_POS') {
    const newState = { ...state };
    newState.x = action.x;
    newState.y = action.y;
    newState.eq = action.eq ? action.eq : null;
    return newState;
  }
  return state;
};
export default mouseReducer;
