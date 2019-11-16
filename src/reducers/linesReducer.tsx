const linesReducer = (state = [], action: any) => {
  if (action.type === 'ADD_LINE') {
    // @ts-ignore
    const newState = state.concat([action.line]);
    return newState;
  }

  if (action.type === 'REMOVE_LINE') {
    // @ts-ignore
    const newState = state.filter((itm) => itm !== action.line);
    return newState;
  }

  if (action.type === 'CLEAR_CANVAS') {
    const newState: any = [];
    return newState;
  }

  if (action.type === 'CHANGE_LINE') {
    const newState = [...state];
    // @ts-ignore
    const ind = newState.indexOf(action.oldLine);
    if (ind !== -1) {
      // @ts-ignore
      newState[ind] = action.newLine;
      return newState;
    }
  }
  return state;
};
export default linesReducer;
