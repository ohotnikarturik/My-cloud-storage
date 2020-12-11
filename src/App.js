import React from "react";
import "materialize-css";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { useRoutes } from "./useRoutes";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  const routes = useRoutes()

  return (
    <Router>
      <NavBar />
      <main style={{minHeight: '100%'}} >{routes}</main> 
      <Footer />
    </Router>
  
  )
};

export default App;
