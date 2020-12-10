import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

// import FormErrors from "../FormErrors";
import Validate from "../components/utility/FormValidation";

const SignUp = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false,
    },
  });

  const clearErrorState = () => {
    setError({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, user);
    if (error) {
      setError({
        errors: { ...error.errors, ...error },
      });
    }

    // AWS Cognito integration here
    const { username, email, password } = user;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      });
      history.push("/storage");
      console.log(signUpResponse);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setError({
        errors: {
          ...error.errors,
          cognito: err,
        },
      });
    }
  };

  const onInputChange = (event) => {
    setUser({
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" className="validate" />
            <label for="icon_prefix">First Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" className="validate" />
            <label for="icon_telephone">Telephone</label>
          </div>
        </div>
      </form>
    </div>
  );

  
};

export default SignUp;
