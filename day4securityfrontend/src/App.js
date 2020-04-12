import React, { useState, useContext } from 'react';
import {
  Switch,
  Route,
  NavLink,
  useHistory,
  Redirect
} from "react-router-dom";
import Modal from "./Modal";
import LogIn from "./Login";
import NoMatch from "./NoMatch";
import Scrape from "./Scrape";
import Jokes from "./Jokes";
import Home from "./Home";
import {AuthContext} from "./AuthContext";
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

function App() {
  const {auth: {isAdmin, isLoggedIn} } = useContext(AuthContext);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const toggleModalLogin = () => setShowModalLogin(!showModalLogin);
  let history = useHistory();

  return (
    <div>
      <Header loginMsg={isLoggedIn ? "Logout" : "Login"}
        toggleModal={toggleModalLogin}
      />

      <hr />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/jokes" >
            {isLoggedIn ? <Jokes /> : <Redirect to="/login-out" />}
          </Route>
          <Route path="/scrape">
            {isLoggedIn && isAdmin ? <Scrape /> : <Redirect to="/login-out" />}
          </Route>
          <Route path="/login-out">
            {showModalLogin ? (<Modal toggleModalLogin={toggleModalLogin}>
            <LogIn
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              toggleModalLogin={toggleModalLogin}
              history={history}
            />
            </Modal>) : null}
          </Route>
          <Route >
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Header({ loginMsg, toggleModal }) {
  const {auth: {isAdmin, isLoggedIn, username} } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" component={NavLink} exact to="/" color="inherit" aria-label="home">
          <HomeIcon />
        </IconButton>
        {isLoggedIn && (
            <IconButton component={NavLink} to="/jokes" color="inherit" >
              Jokes
        </IconButton>
        )}
        {isAdmin && (
        <IconButton component={NavLink} to="/scrape" color="inherit" >
          Scrape
        </IconButton>
        )}
        <IconButton component={NavLink} to="/login-out" color="inherit" onClick={toggleModal} >
          {loginMsg}
        </IconButton>
        {isLoggedIn && (
          <Typography variant="h6" noWrap>
          {username}
        </Typography>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default App;
