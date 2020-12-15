import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { NavLink, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { object, string } from "yup";

import { useMessage } from "../hooks/message.hook";

const SignUp = () => {
  const message = useMessage();
  const history = useHistory();
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    email: string()
      .email("Email must be a valid email")
      .required("Please, provide your email.")
      .matches(/^(.*)?\S+(.*)?$/, "Cannot be empty."),
    password: string()
      .min(8, "Password should be at least 8 characters.")
      .max(30, "Password should not exceed 30 characters.")
      .required("Please, provide your password.")
      .matches(/^(?=.*[a-z])/, "At least one a lowercase letter is required")
      .matches(/^(?=.*[A-Z])/, "At least one a uppercase letter is required")
      .matches(/^(?=.*[0-9])/, "At least one a number is required")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "At least one a special character is required"
      )
      .matches(/^(.*)?\S+(.*)?$/, "Cannot be empty."),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password should to be the same"
      ),
    }),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("handleSubmit", values);
    const { username, email, password } = values;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      resetForm({});
      message(`User ${signUpResponse.user.username} was created successful`);
      history.push("/welcome");
      console.log(signUpResponse);
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
        Sign up
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
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons prefix">password</i>
                <input
                  onChange={handleChange("confirmPassword")}
                  id="confirmpassword"
                  type="password"
                  className="validate"
                  value={values.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                />
                <label htmlFor="confirmpassword">Confirm password</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.confirmPassword}
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
                Sign up
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
