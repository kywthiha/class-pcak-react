import axiosInstance from "../axiosInstance";
import { FETCH_PACK_LIST, FETCH_TIME_SCHEDULE_CONFIGURATION } from "../constants/actionTypes";

import { handleError } from "../helper";

export function fetchTimeScheudleConfiguration({ params }) {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_TIME_SCHEDULE_CONFIGURATION, payload: { inProgress: true } });
            const response = await axiosInstance.get(`/api/time-schedule-configuration`)
            dispatch({ type: FETCH_TIME_SCHEDULE_CONFIGURATION, payload: { data: response.data.data } });
        } catch (e) {
            dispatch({ type: FETCH_TIME_SCHEDULE_CONFIGURATION, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
} 