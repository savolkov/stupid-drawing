import Group from "../classes/Group";

const groupsReducer = (state: Group[] = [], action: any) => {
  if (action.type === 'ADD_GROUP') {
    // @ts-ignore
    const newState = state.concat([action.group]);
    return newState;
  }

  if (action.type === 'REMOVE_GROUP') {
    const newState = state.filter((itm) => itm.id !== action.id);
    return newState;
  }

  if (action.type === 'CLEAR_GROUPS') {
    const newState: any = [];
    return newState;
  }

  return state;
};
export default groupsReducer;
