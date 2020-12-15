import { LOGIN_USER } from "../types";
const initialState = {
  isLogged: false,
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogged: true };
    default:
      return state;
  }
};

export default loggedReducer;
