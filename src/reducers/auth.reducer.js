import {
  LOGIN, LOGOUT
} from '../constants/actionTypes';

export default function AuthReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null
      };
    case LOGOUT:
      return {
        ...state,
        inProgressLogout: action.payload.inProgress || false,
        errorsLogout: action.payload.errors || null
      };
    default:
      return state;
  }
};