import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { NavLink, useHistory } from "react-router-dom";

// import FormErrors from "../FormErrors";
import Validate from "../components/utility/FormValidation";

const SignUp = () => {
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  console.log('state',user);

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
    // clearErrorState();
    // const error = Validate(event, user);
    // if (error) {
    //   setError({
    //     errors: { ...error.errors, ...error },
    //   });
    // }

    // AWS Cognito integration here
    console.log(user);
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
      console.log(error) 
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
    // setForm({ ...form, [event.target.name]: event.target.value })
    setUser({ ...user, [event.target.id]: event.target.value });
    // document.getElementById(event.target.id).classList.remove("is-danger");
  };

  return (
    <div className="row container">
      <h4
        style={mainTitle}
        className="col s6 offset-s3 blue-grey-text text-darken-3"
      >
        Sign up
      </h4>
      <form  className="col s12">
        <div className="row">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons  prefix">account_circle</i>
            <input
              onChange={onInputChange}
              id="username"
              type="text"
              className="validate"
              value={user.username}
            />
            <label htmlFor="username">User Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons  prefix">email</i>
            <input
              onChange={onInputChange}
              id="email"
              type="email"
              className="validate"
              value={user.email}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">password</i>
            <input
              onChange={onInputChange}
              id="password"
              type="password"
              className="validate teal-input"
              value={user.password}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">password</i>
            <input
              onChange={onInputChange}
              id="confirmpassword"
              type="password"
              className="validate"
              value={user.confirmpassword}
            />
            <label htmlFor="confirmpassword">Confirm password</label>
          </div>
        </div>
      </form>
      <div>
        <div style={{marginBottom: "20px"}} className="col s6 offset-s3">
          <NavLink
            to="/forgotpassword"
            className="waves-effect waves-light btn-small blue-grey darken-2 right" 
          >
            Forgot password?
          </NavLink>
        </div>
        <div className="col s6 offset-s3">
          <NavLink
            onClick={handleSubmit}
            to="/signup"
            className="waves-effect waves-light btn-small right"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );

  // <section className="section auth">
  //   <div className="container">
  //     <h1>Register</h1>
  //     <FormErrors formerrors={this.state.errors} />

  //     <form onSubmit={this.handleSubmit}>
  //       <div className="field">
  //         <p className="control">
  //           <input
  //             className="input"
  //             type="text"
  //             id="username"
  //             aria-describedby="userNameHelp"
  //             placeholder="Enter username"
  //             value={this.state.username}
  //             onChange={this.onInputChange}
  //           />
  //         </p>
  //       </div>
  //       <div className="field">
  //         <p className="control has-icons-left has-icons-right">
  //           <input
  //             className="input"
  //             type="email"
  //             id="email"
  //             aria-describedby="emailHelp"
  //             placeholder="Enter email"
  //             value={this.state.email}
  //             onChange={this.onInputChange}
  //           />
  //           <span className="icon is-small is-left">
  //             <i className="fas fa-envelope"></i>
  //           </span>
  //         </p>
  //       </div>
  //       <div className="field">
  //         <p className="control has-icons-left">
  //           <input
  //             className="input"
  //             type="password"
  //             id="password"
  //             placeholder="Password"
  //             value={this.state.password}
  //             onChange={this.onInputChange}
  //           />
  //           <span className="icon is-small is-left">
  //             <i className="fas fa-lock"></i>
  //           </span>
  //         </p>
  //       </div>
  //       <div className="field">
  //         <p className="control has-icons-left">
  //           <input
  //             className="input"
  //             type="password"
  //             id="confirmpassword"
  //             placeholder="Confirm password"
  //             value={this.state.confirmpassword}
  //             onChange={this.onInputChange}
  //           />
  //           <span className="icon is-small is-left">
  //             <i className="fas fa-lock"></i>
  //           </span>
  //         </p>
  //       </div>
  //       <div className="field">
  //         <p className="control">
  //           <a href="/forgotpassword">Forgot password?</a>
  //         </p>
  //       </div>
  //       <div className="field">
  //         <p className="control">
  //           <button className="button is-success">
  //             Register
  //           </button>
  //         </p>
  //       </div>
  //     </form>
  //   </div>
  // </section>
};

export default SignUp;
