import axiosInstance from "../axiosInstance";
import { FETCH_PACK_LIST } from "../constants/actionTypes";

import { handleError, setToken } from "../helper";

export function getPackList({ params }) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_PACK_LIST, payload: { inProgress: true } });
            const response = await axiosInstance.get(`/api/pack?${params}`)
            dispatch({ type: FETCH_PACK_LIST, payload: { pack_list: response.data.data.pack_list } });
        } catch (e) {
            dispatch({ type: FETCH_PACK_LIST, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
} 