import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
//import "./style1.css";
import "./style2.css";
import Exercise1 from "./exercises/Exercise1";
import Exercise2 from "./exercises/Exercise2";
import Exercise3 from "./exercises/Exercise3";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        
        <Header />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
          <Switch>
            <Route path="/Exercise1">
              <Exercise1 initialValue={5} incrementValue={3}/>
            </Route>
            <Route path="/Exercise2">
              <Exercise2 />
            </Route>
            <Route path="/Exercise3">
              <Exercise3 />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Header() {
  return (
    <ul className="header">
          <li>
            <NavLink exact activeClassName="selected" to="/Exercise1">Exercise1</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/Exercise2">Exercise2</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/Exercise3">Exercise3</NavLink>
          </li>
        </ul>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
