import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state.auth);
  const isLogged = state.isLogged;
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Welcome to Cloud Storage
          </h4>
          {isLogged ? (
            <p>
              You are signed in. Your <NavLink to="/storage">Storage</NavLink>{" "}
              avaible to you.
            </p>
          ) : (
            <p>
              To start use your storage, please{" "}
              <NavLink to="/signup">Sign Up</NavLink> or{" "}
              <NavLink to="/login">Log In</NavLink>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
