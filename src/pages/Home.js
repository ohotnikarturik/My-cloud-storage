import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state.auth);
  const isLogged = state.isLogged;
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "20px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12" style={{ marginBottom: "20px" }}>
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Welcome to Cloud Storage
          </h4>
          {isLogged ? (
            <p>
              You are signed in. Your <NavLink className="blue-text text-lighten-1" to="/storage">Storage</NavLink>{" "}
              avaible to you.
            </p>
          ) : (
            <p>
              To start use your storage, please{" "}
              <NavLink className="blue-text text-lighten-1" to="/signup">Sign Up</NavLink> or{" "}
              <NavLink className="blue-text text-lighten-1" to="/login">Log In</NavLink>
            </p>
          )}
        </div>
        <div
          className="col s12"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <i
            style={{ fontSize: "240px", justifySelf: "center" }}
            className="center-align material-icons icon-blue"
          >
            cloud
          </i>
        </div>
        <div
          className="col s12"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <i
            style={{ fontSize: "50px", justifySelf: "center" }}
            className="center-align material-icons icon-black"
          >
            arrow_upward
          </i>
          <i
            style={{ fontSize: "50px", justifySelf: "center" }}
            className="center-align material-icons icon-blue"
          >
            arrow_downward
          </i>
        </div>
        <div
          className="col s12"
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <i
            style={{ fontSize: "100px", justifySelf: "center" }}
            className="center-align material-icons icon-black"
          >
            devices
          </i>
        </div>
      </div>
    </div>
  );
};

export default Home;
