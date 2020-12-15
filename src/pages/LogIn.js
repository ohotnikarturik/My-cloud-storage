import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { NavLink, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { object, string } from "yup";

import { useMessage } from "../hooks/message.hook";

const LogIn = () => {
  const message = useMessage();
  const history = useHistory();
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };
  const initialValues = {
    username: "",
    password: "",
  };
  const [cognitoError, setCognitoError] = useState({ error: "" });

  useEffect(() => {
    message(cognitoError.error);
    setCognitoError({ error: "" });
  }, [cognitoError.error, message]);

  const validationSchema = object().shape({
    username: string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name should not exceed 30 characters.")
      .required("Please, provide your name.")
      .matches(/^(.*)?\S+(.*)?$/, "Field cannot be empty."),
    password: string()
      .min(8, "Password should be at least 8 characters.")
      .max(30, "Password should not exceed 30 characters.")
      .required("Please, provide your password.")
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("handleSubmit", values);
    const { username, password } = values;
    try {
      const user = await Auth.signIn(username, password);
      resetForm({});
      message(`User ${username} was signed in successful`);
      history.push("/storage");
      console.log(user);
    } catch (error) {
      console.log(error);
      setCognitoError({
        ...error,
        error: error.message,
      });
    }
  };

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
                <i className="material-icons  prefix">account_circle</i>
                <input
                  onChange={handleChange("username")}
                  id="username"
                  type="text"
                  className="validate"
                  value={values.username}
                  onBlur={handleBlur("username")}
                />
                <label htmlFor="username">User Name</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.username && touched.username && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.username}
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
