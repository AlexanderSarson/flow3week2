import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css"
import {AuthProvider} from "./AuthContext";

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
ReactDOM.render(<AuthProvider><AppWithRouter /> </AuthProvider>, document.getElementById("root"));
