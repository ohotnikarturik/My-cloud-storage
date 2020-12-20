import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  const state = useSelector((state) => state.auth);
  const userName = state.user.user.user.username;
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Hi, <span className="purple-text text-lighten-2">{userName}</span>
          </h4>
          <p>
            We just need to verify your account before you can access your Cloud
            Storage
          </p>
          <p>
            We've sent you an email. Please check your mail and click on the
            confirmation link to verify your account.
          </p>
          <p>When you are done click on button below</p>
          <NavLink to="/storage" className="waves-effect waves-light btn-small">
            Confirmed
            <i style={{ fontSize: "20px" }} className="material-icons right">
              mark_email_read
            </i>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
