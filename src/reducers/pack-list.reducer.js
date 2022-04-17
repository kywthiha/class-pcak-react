import { FETCH_PACK_LIST } from "../constants/actionTypes";


const initialState = {
  inProgress: false,
  pack_list: [],
}

export default function PackListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PACK_LIST:
      return {
        ...state,
        pack_list: action.payload.pack_list || [],
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null
      };
    default:
      return state;
  }
};