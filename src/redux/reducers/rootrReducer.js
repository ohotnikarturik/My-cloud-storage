import { combineReducers } from "redux";

import isLoggedReducer from "./isLoggedReducer";

const allReducers = combineReducers({ login: isLoggedReducer });

export default allReducers;
