import React, { useEffect, useState } from "react";
import "materialize-css";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Auth } from "aws-amplify";

import { useRoutes } from "./routes";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";
import { useMessage } from "./hooks/message.hook";
import {
  getSessionSuccess,
  getSessionFail,
  getAuthenticatedUserSuccess,
  getAuthenticatedUserFail,
} from "./redux/actions";

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const routes = useRoutes();
  const message = useMessage();
  const state = useSelector((state) => state.app);
  const alertMessage = state.alert;

  useEffect(() => {
    message(alertMessage);
  }, [alertMessage, message]);

  useEffect(() => {
    const getCurrentSession = async () => {
      try {
        await Auth.currentSession();
        dispatch(getSessionSuccess());
        const user = await Auth.currentAuthenticatedUser();
        dispatch(getAuthenticatedUserSuccess(user));
      } catch (error) {
        dispatch(getSessionFail());
        dispatch(getAuthenticatedUserFail());
      }
    };

    getCurrentSession();
    setIsAuthenticating(true)
  }, [dispatch]);
  
  return (
    isAuthenticating && (
      <Router>
        <NavBar />
        <main style={{ height: "100%" }}>{routes}</main>
        <Footer />
      </Router>
    )
  );
};

export default App;
