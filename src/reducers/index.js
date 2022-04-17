import { combineReducers } from "redux";
import PackListReducer from "./pack-list.reducer";
import AuthReducer from "./auth.reducer";
import PackDetailReducer from "./pack-detail.reducer";
import OrderReducer from "./order.reducer";


export default combineReducers({
    auth: AuthReducer,
    packList:PackListReducer,
    pack:PackDetailReducer,
    order:OrderReducer,
});