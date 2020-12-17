import React, { useEffect } from "react";
import "materialize-css";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

import { useRoutes } from "./routes";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";
import { useMessage } from "./hooks/message.hook";

const App = () => {
  const routes = useRoutes();
  const message = useMessage();
  const state = useSelector((state) => state.app);
  const alertMessage = state.alert;

  useEffect(() => {
    message(alertMessage);
  }, [alertMessage, message]);

  return (
    <Router>
      <NavBar />
      <main style={{ height: "100%" }}>{routes}</main>
      <Footer />
    </Router>
  );
};

export default App;
