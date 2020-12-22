import React from "react";
import { Auth } from "aws-amplify";
import { NavLink, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  logInSuccess,
  logInFail,
  showAlert,
  hideAlert,
  showLoader,
  hideLoader,
} from "../redux/actions";
import Loader from "../components/Loader";

const LogIn = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const history = useHistory();
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = object().shape({
    email: string()
      .email("Email must be a valid email")
      .required("Please, provide your email.")
      .matches(/^(.*)?\S+(.*)?$/, "Field cannot be empty."),
      password: string()
      .min(8, "Password should be at least 8 characters.")
      .max(30, "Password should not exceed 30 characters.")
      .required("Please, provide your password.")
      .matches(/^(?=.*[a-z])/, "At least one a lowercase letter is required")
      .matches(/^(?=.*[A-Z])/, "At least one a uppercase letter is required")
      .matches(/^(?=.*[0-9])/, "At least one a number is required")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
        "At least one a special character is required"
      )
      .matches(/^(.*)?\S+(.*)?$/, "Field cannot be empty."),
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      dispatch(showLoader());
      const logInResponce = await Auth.signIn(email, password);
      dispatch(hideLoader());
      const userName = logInResponce.attributes.name;
      dispatch(logInSuccess(logInResponce));
      dispatch(showAlert(`User ${userName} was signed in successful`));
      dispatch(hideAlert());
      history.push("/storage");
    } catch (error) {
      dispatch(logInFail());
      dispatch(hideLoader());
      dispatch(showAlert(error.message));
      dispatch(hideAlert());
    }
  };

  if (loading) {
    return (
      <div className="row container">
        <div className="center-align" style={{ marginTop: "200px" }}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="row container">
      <h4
        style={mainTitle}
        className="col s6 offset-s3 blue-grey-text text-darken-3"
      >
        Log in
      </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleSubmit,
          errors,
          handleChange,
          handleBlur,
          touched,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} className="col s12">
             <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons  prefix">email</i>
                <input
                  onChange={handleChange("email")}
                  id="email"
                  type="email"
                  className="validate"
                  value={values.email}
                  onBlur={handleBlur("email")}
                />
                <label htmlFor="email">Email</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.email && touched.email && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons prefix">password</i>
                <input
                  onChange={handleChange("password")}
                  id="password"
                  type="password"
                  className="validate teal-input"
                  value={values.password}
                  onBlur={handleBlur("password")}
                />
                <label htmlFor="password">Password</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.password && touched.password && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col s6 offset-s3">
              <NavLink
                to="/forgotpassword"
                className="waves-effect waves-light btn-small blue-grey darken-2"
              >
                Forgot password?
              </NavLink>

              <button
                type="submit"
                className={`waves-effect waves-light btn-small right ${
                  !isValid && "disabled"
                }`}
              >
                Log in
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LogIn;
