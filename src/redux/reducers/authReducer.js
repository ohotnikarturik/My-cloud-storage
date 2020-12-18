import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAIL,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL,
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
    case GET_SESSION_SUCCESS:
      return { ...state, isLogged: true, user: null };
    case GET_SESSION_FAIL:
      return { ...state, isLogged: false, user: null };
    case GET_AUTH_USER_SUCCESS:
      return { ...state, isLogged: true, user: payload };
    case GET_AUTH_USER_FAIL:
      return { ...state, isLogged: false, user: null };
    default:
      return state;
  }
};

export default loggedReducer;
