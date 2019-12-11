import Group from "../classes/Group";

export const addGroupAction = (group: Group) => ({
  type: 'ADD_GROUP',
  group,
});

export const removeGroupAction = (id: string) => ({
  type: 'REMOVE_GROUP',
  id,
});

export const clearGroupsAction = () => ({
  type: 'CLEAR_GROUPS',
});
