import { APPLY_PROMO_CODE, FETCH_PACK_DETAIL, RESET_FETCH_PACK_DETAIL } from "../constants/actionTypes";


const initialState = {
  inProgress: false,
  pack: {},
}

export default function PackDetailReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_PACK_DETAIL:
      return {
        ...state,
        pack: action.payload.pack,
        inProgress: action.payload.inProgress || false,
        errors: action.payload.errors || null
      };
    case APPLY_PROMO_CODE:
      return {
        ...state,
        promo_code: action.payload.promo_code,
        inProgressApplyPromoCode: action.payload.inProgress || false,
        errorsApplyPromoCode: action.payload.errors || null
      };
    case RESET_FETCH_PACK_DETAIL:
      return {
        inProgress: false,
        pack: {},
      };
    default:
      return state;
  }
};