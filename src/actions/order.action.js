import axiosInstance from "../axiosInstance";
import { CREATE_ORDER } from "../constants/actionTypes";

import { handleError, setToken } from "../helper";

export function createOrder({ order_packs, promo_code }) {
    return async dispatch => {
        try {
            dispatch({ type: CREATE_ORDER, payload: { inProgress: true } });
            const response = await axiosInstance.post(`/api/order`, { order_packs, promo_code })
            dispatch({ type: CREATE_ORDER, payload: { order: response.data.data } });
        } catch (e) {
            dispatch({ type: CREATE_ORDER, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
} 