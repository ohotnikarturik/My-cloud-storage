import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types";
const initialState = {
  isLogged: false,
  user: null,
};

const loggedReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return { ...state, isLogged: true, user: payload };
    case SIGNUP_FAIL:
      return { ...state, isLogged: false, user: null };
    case LOGIN_SUCCESS:
      return { ...state, isLogged: true, user: payload };
    case LOGIN_FAIL:
      return { ...state, isLogged: false, user: null };
    case LOGOUT:
      return { ...state, isLogged: false, user: null };
    default:
      return state;
  }
};

export default loggedReducer;
