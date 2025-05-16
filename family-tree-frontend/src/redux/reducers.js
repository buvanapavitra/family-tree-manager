import * as types from './types';
const initialState = { members: [] };

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_MEMBERS:
      return { ...state, members: action.payload };
    default:
      return state;
  }
}
