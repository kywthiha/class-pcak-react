import { CREATE_ORDER } from "../constants/actionTypes";


const initialState = {
  inProgress: false,
  order: {},
}

export default function OrderReducer(state = initialState, action) {

  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload.order || {},
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null
      };
    default:
      return state;
  }
};