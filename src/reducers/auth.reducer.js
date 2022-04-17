import {
  LOGIN
} from '../constants/actionTypes';

export default function AuthReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null
      };
    default:
      return state;
  }
};