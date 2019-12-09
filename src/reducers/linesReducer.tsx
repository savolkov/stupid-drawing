import Line from "../classes/Line";

const linesReducer = (state: Line[] = [], action: any) => {
  if (action.type === 'ADD_LINE') {
    // @ts-ignore
    const newState = state.concat([action.line]);
    return newState;
  }

  if (action.type === 'REMOVE_LINE') {
    const newState = state.filter((itm) => itm.id !== action.id);
    return newState;
  }

  if (action.type === 'CLEAR_CANVAS') {
    const newState: any = [];
    return newState;
  }

  if (action.type === 'CHANGE_LINE') {
    const newState = [...state];
    const ids = newState.map((itm) => itm.id);
    const ind = ids.indexOf(action.id);
    if (ind !== -1) {
      // @ts-ignore
      newState[ind] = action.newLine;
      return newState;
    }
  }
  return state;
};
export default linesReducer;
