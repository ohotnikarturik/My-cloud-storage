import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ChangePasswordConfirm = () => {
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
            <NavLink to="/login">Log In</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordConfirm;
