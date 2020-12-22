import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ChangePasswordConfirm = () => {
  const state = useSelector((state) => state.auth);
  const isLogged = state.isLogged;
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "20px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Change Password
          </h4>
          <p>
            Your password has been successfully updated!{" "}
            {isLogged ? (
              <NavLink to="/storage">Storage</NavLink>
            ) : (
              <NavLink to="/login">Log In</NavLink>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordConfirm;
