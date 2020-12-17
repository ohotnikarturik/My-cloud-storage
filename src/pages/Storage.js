import React from "react";
import { useSelector } from "react-redux";

const Storage = () => {
  const state = useSelector((state) => state.auth);
  const userName = state.user.user.username;

  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Welcome{" "}
            <span className="purple-text text-lighten-2">{userName}</span> to
            your Cloud storage
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Storage;
