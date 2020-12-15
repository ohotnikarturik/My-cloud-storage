import React from "react";

const Welcome = () => {
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4
            style={mainTitle}
            className="center-align blue-grey-text text-darken-3"
          >
            Welcome to Cloud Storage
          </h4>
          <p>You have successfully Signed Up a new account.</p>
          <p>
            We've sent you a email. Please click on the confirmation link to
            verify your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
