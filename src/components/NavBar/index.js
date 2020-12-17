import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const brandLogo = {
    fontSize: "24px",
  };

  const isLogged = useSelector((state) => state.auth.isLogged);

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
              <NavLink to="/" className="waves-effect waves-light btn-small">
                Log out
                <i
                  style={{ fontSize: "20px" }}
                  className="material-icons right"
                >
                  directions_walk
                </i>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
