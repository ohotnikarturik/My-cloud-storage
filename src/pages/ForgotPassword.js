import React from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";

import { showAlert, hideAlert, showLoader, hideLoader } from "../redux/actions";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const history = useHistory();
  const mainTitle = {
    marginTop: "40px",
    marginBottom: "20px",
  };
  const initialValues = {
    email: "",
  };

  const validationSchema = object().shape({
    email: string()
      .email("Email must be a valid email")
      .required("Please, provide your email.")
      .matches(/^(.*)?\S+(.*)?$/, "Field cannot be empty."),
  });

  const onSubmit = async (values) => {
    const { email } = values;
    try {
      dispatch(showLoader());
      await Auth.forgotPassword(email);
      dispatch(hideLoader());
      dispatch(showAlert(`The code has been sent`));
      dispatch(hideAlert());
      history.push("/forgotpasswordverification");
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
        Forgot your password?
      </h4>
      <p className="col s6 offset-s3" style={{ marginBottom: "50px" }}>
        Please enter the email address associated with your account and we'll
        email you a password reset link.
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

export default ForgotPassword;
