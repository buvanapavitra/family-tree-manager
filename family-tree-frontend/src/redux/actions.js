import * as types from './types';
export const fetchMembers = () => ({ type: types.FETCH_MEMBERS });
export const setMembers = (members) => ({ type: types.SET_MEMBERS, payload: members });
export const addMember = (member) => ({ type: types.ADD_MEMBER, payload: member });
export const updateMember = (member) => ({ type: types.UPDATE_MEMBER, payload: member });
export const deleteMember = (id) => ({ type: types.DELETE_MEMBER, payload: id });
