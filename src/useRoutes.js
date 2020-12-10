import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";

export const useRoutes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/products">
      <Products />
    </Route>
    <Redirect to="/" />
  </Switch>
);
