import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";

import {
  logOut,
  showAlert,
  hideAlert,
  showLoader,
  hideLoader,
} from "../../redux/actions";

export const NavBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const isLogged = state.isLogged;
  const userName = state.user && state.user.user.hasOwnProperty('attributes') && state.user.user.attributes.name;
  const brandLogo = {
    fontSize: "24px",
  };

  const handlerLogOut = async (e) => {
    e.preventDefault()
    try {
      dispatch(showLoader())
      await Auth.signOut()
      dispatch(hideLoader())
      dispatch(showAlert(`Good bye ${userName}, and welcome back`));
      dispatch(hideAlert());
      dispatch(logOut()) 
    } catch (error) {
      console.log(error)
      dispatch(hideLoader())
      dispatch(showAlert(error.message));
      dispatch(hideAlert());
    }
  }

  return (
    <nav className="blue-grey darken-3">
      <div className="nav-wrapper container">
        <NavLink to="/" style={brandLogo} className="brand-logo">
          Cloud storage
          <i style={{ fontSize: "50px" }} className="material-icons">
            cloud
          </i>
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLogged && (
            <li>
              <NavLink to="/storage">Storage</NavLink>
            </li>
          )}
          {!isLogged ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="waves-effect waves-light btn-small"
                >
                  Log in
                  <i
                    style={{ fontSize: "20px" }}
                    className="material-icons right"
                  >
                    login
                  </i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="waves-effect waves-light btn-small"
                >
                  Sign up
                  <i
                    style={{ fontSize: "20px" }}
                    className="material-icons right"
                  >
                    how_to_reg
                  </i>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="changepassword" className="purple lighten-2 waves-effect waves-light btn-small">
                Change Password
              </NavLink>
              <button onClick={handlerLogOut} className="waves-effect waves-light btn-small">
                Log out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
