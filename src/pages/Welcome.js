import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  const userEmail  = useSelector((state) => state.auth.user && state.auth.user.user.user.username);
  
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "20px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Hi, a new User!
          </h4>
          <p>
            Check your email: <span className="purple-text text-lighten-2">
              {userEmail}
            </span>
          </p>
          <p>
            Click there on the confirmation link to verify your account and come back.
          </p>
          <p>
            When you are done let's go and{" "}
            <NavLink to="/login" className="blue-text text-lighten-1">Log in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
