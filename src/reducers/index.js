import { combineReducers } from "redux";
import PackListReducer from "./pack-list.reducer";
import AuthReducer from "./auth.reducer";


export default combineReducers({
    auth: AuthReducer,
    packList:PackListReducer,
});