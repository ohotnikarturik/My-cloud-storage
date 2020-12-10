import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Storage from "./pages/Storage";

export const useRoutes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/storage">
      <Storage />
    </Route>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Redirect to="/" />
  </Switch>
);
