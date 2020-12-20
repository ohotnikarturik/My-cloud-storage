import React from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";

import { showAlert, hideAlert, showLoader, hideLoader } from "../redux/actions";
import Loader from "../components/Loader";

const ForgotPasswordVerification = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const history = useHistory();
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "20px",
  };
  const initialValues = {
    verificationCode: "",
    email: "",
    newPassword: "",
  };

  const validationSchema = object().shape({
    verificationCode: string()
      .matches(/^[0-9]*$/, "Code should be only numbers")
      .min(6, "Code should be minimum 6 numbers")
      .max(6, "Code should be maximum 6 numbers")
      .required("Please, provide verification code.")
      .matches(/^(.*)?\S+(.*)?$/, "Field cannot be empty."),
    email: string()
      .email("Email must be a valid email")
      .required("Please, provide your email.")
      .matches(/^(.*)?\S+(.*)?$/, "Field cannot be empty."),
    newPassword: string()
      .min(8, "New password should be at least 8 characters.")
      .max(30, "New assword should not exceed 30 characters.")
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
    const { verificationCode, email, newPassword } = values;
    try {
      dispatch(showLoader());
      await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);
      dispatch(hideLoader());
      dispatch(showAlert(`Your password updated`));
      dispatch(hideAlert());
      history.push("/login");
    } catch (error) {
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
        Set New Password
      </h4>
      <p className="col s6 offset-s3" style={{ marginBottom: "50px" }}>
        Please enter the verification code sent to your email address below,
        your email address and a new password.
      </p>

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
                <i className="material-icons  prefix">vpn_key</i>
                <input
                  onChange={handleChange("verificationCode")}
                  id="verificationCode"
                  type="text"
                  className="validate"
                  value={values.verificationCode}
                  onBlur={handleBlur("verificationCode")}
                />
                <label htmlFor="verificationCode">
                  Enter verification code
                </label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.verificationCode && touched.verificationCode && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.verificationCode}
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
                  onChange={handleChange("newPassword")}
                  id="newPassword"
                  type="password"
                  className="validate teal-input"
                  value={values.newPassword}
                  onBlur={handleBlur("newPassword")}
                />
                <label htmlFor="password">New password</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.newPassword && touched.newPassword && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.newPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col s6 offset-s3">
              <button
                type="submit"
                className={`waves-effect waves-light btn-small right ${
                  !isValid && "disabled"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordVerification;
