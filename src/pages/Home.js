import React from "react";

const Home = () => {
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="center-align blue-grey-text text-darken-3">Welcome to Cloud Storage</h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
