import React from "react";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";

const Welcome = () => {
  const state = useSelector((state) => state.auth);
  const userName = 'test'
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };

  const getAuthenticatedUser = async () => {
    try {
      const user = await Auth.verifyCurrentUserAttribute("email");

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 ">
          <h4 style={mainTitle} className="blue-grey-text text-darken-3">
            Hi, <span className="purple-text text-lighten-2">{userName && userName}</span>
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
          <button
            onClick={getAuthenticatedUser}
            className="waves-effect waves-light btn-small"
          >
            Confirmed
            <i style={{ fontSize: "20px" }} className="material-icons right">
              mark_email_read
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
