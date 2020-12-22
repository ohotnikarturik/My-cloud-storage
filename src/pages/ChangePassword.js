import React from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";

import { showAlert, hideAlert, showLoader, hideLoader } from "../redux/actions";
import Loader from "../components/Loader";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const history = useHistory();
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "40px",
  };
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = object().shape({
    oldPassword: string()
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
    newPassword: string()
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
    confirmNewPassword: Yup.string()
      .required("Please, provide your new password.")
      .when("newPassword", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Both password should to be the same"
        ),
      }),
  });

  const onSubmit = async (values) => {
    const { oldPassword, newPassword } = values;
    try {
      dispatch(showLoader());
      const user = await Auth.currentAuthenticatedUser();      
      await Auth.changePassword(user, oldPassword, newPassword);
      dispatch(hideLoader());
      dispatch(showAlert(`Your password updated`));
      dispatch(hideAlert());
      history.push("/changepasswordconfirmation");
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
        Change Password
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
                <i className="material-icons prefix">password</i>
                <input
                  onChange={handleChange("oldPassword")}
                  id="oldPassword"
                  type="password"
                  className="validate teal-input"
                  value={values.oldPassword}
                  onBlur={handleBlur("oldPassword")}
                />
                <label htmlFor="oldPassword">Old Password</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.oldPassword && touched.oldPassword && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.oldPassword}
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
                <label htmlFor="newPassword">New Password</label>
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
            <div className="row">
              <div className="input-field col s6 offset-s3">
                <i className="material-icons prefix">password</i>
                <input
                  onChange={handleChange("confirmNewPassword")}
                  id="confirmNewPassword"
                  type="password"
                  className="validate"
                  value={values.confirmNewPassword}
                  onBlur={handleBlur("confirmNewPassword")}
                />
                <label htmlFor="confirmNewPassword">Confirm New password</label>
                <div style={{ height: "5px", paddingLeft: "42px" }}>
                  {errors.confirmNewPassword && touched.confirmNewPassword && (
                    <div
                      style={{ fontSize: "12px" }}
                      className="pink-text text-accent-3"
                    >
                      {errors.confirmNewPassword}
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

export default ChangePassword;
