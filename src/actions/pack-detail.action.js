import axiosInstance from "../axiosInstance";
import { APPLY_PROMO_CODE, FETCH_PACK_DETAIL, RESET_FETCH_PACK_DETAIL } from "../constants/actionTypes";

import { handleError, setToken } from "../helper";

export function getPackDetail({ pack_id }) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_PACK_DETAIL, payload: { inProgress: true } });
            const response = await axiosInstance.get(`/api/pack/${pack_id}`)
            dispatch({ type: FETCH_PACK_DETAIL, payload: { pack: response.data.data } });
        } catch (e) {
            dispatch({ type: FETCH_PACK_DETAIL, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
}


export function applyPromoCode({ code }) {
    return async dispatch => {
        try {
            dispatch({ type: APPLY_PROMO_CODE, payload: { inProgress: true } });
            const response = await axiosInstance.post(`api/promo-code/check`, { code })
            dispatch({ type: APPLY_PROMO_CODE, payload: { promo_code: response.data.data } });
        } catch (e) {
            dispatch({ type: APPLY_PROMO_CODE, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
}

export function resetPackDetail() {
    return async dispatch => {
        dispatch({ type: 'RESET_FETCH_PACK_DETAIL' });
    }
} 