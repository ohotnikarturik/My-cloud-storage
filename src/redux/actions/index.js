import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAIL,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL,
} from "../types";

//AUTH
export function signUpSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      user,
    },
  };
}

export function signUpFail() {
  return {
    type: SIGNUP_FAIL,
  };
}

export function logInSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export function logInFail() {
  return {
    type: LOGIN_FAIL,
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}

export function getSessionSuccess(user) {
  return {
    type: GET_SESSION_SUCCESS,
    payload: {
      user,
    },
  };
}

export function getSessionFail() {
  return {
    type: GET_SESSION_FAIL,
  };
}

export function getAuthenticatedUserSuccess(user) {
  return {
    type: GET_AUTH_USER_SUCCESS,
    payload: {
      user,
    },
  };
}

export function getAuthenticatedUserFail() {
  return {
    type: GET_AUTH_USER_FAIL,
  };
}

//APP
export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const showAlert = (message) => {
  return {
    type: SHOW_ALERT,
    payload: message,
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
