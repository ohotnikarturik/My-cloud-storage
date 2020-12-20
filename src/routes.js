import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Storage from "./pages/Storage";
import Welcome from "./pages/Welcome";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordVerification from "./pages/ForgotPasswordVerification";
import ChangePasswordConfirm from "./pages/ChangePasswordConfirm";

export const useRoutes = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  if (isLogged) {
    return (
      <Switch>
        <Route path="/storage">
          <Storage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LogIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/forgotpassword">
        <ForgotPassword />
      </Route>
      <Route path="/forgotpasswordverification">
        <ForgotPasswordVerification />
      </Route>
      <Route path="/changepasswordconfirm">
        <ChangePasswordConfirm />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
