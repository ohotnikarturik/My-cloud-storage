import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Storage from "./pages/Storage";
import Welcome from "./pages/Welcome";

export const useRoutes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/storage">
      <Storage />
    </Route>
    <Route path="/login">
      <LogIn />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/welcome">
      <Welcome />
    </Route>
    <Redirect to="/" />
  </Switch>
);
