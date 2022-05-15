import { combineReducers } from "redux";

import AuthReducer from "./auth.reducer";
import TimeScheuldeConfigurationReducer from "./time-schedule-configuration.reducer";

export default combineReducers({
  auth: AuthReducer,
  timeScheuldeConfiguration: TimeScheuldeConfigurationReducer,
});
