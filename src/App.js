import React from "react";
import "materialize-css";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { useRoutes } from "./useRoutes";
import { NavBar } from "./components/NavBar/NavBar";

const App = () => {
  const routes = useRoutes()

  return (
    <Router>
      <NavBar />
      <div style={{height: '100%'}} >{routes}</div> 
    </Router>
  
  )
};

export default App;
