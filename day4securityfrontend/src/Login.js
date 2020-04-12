import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import facade from "./apiFacade";
import { AuthContext } from "./AuthContext";

export default function LogIn({ toggleModalLogin, history }) {
  const { auth: { isLoggedIn }, login, logout } = useContext(AuthContext);
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const handleLogout = () => {
    facade.logout()
    logout();
    toggleModalLogin();
    history.push("/");
  }

  const handleLogin = (user, pass) => {
    facade.login(user, pass)
      .then(response => {
        facade.setToken(response.token);
        const decodedJwtTokenObj = facade.parseJwt(response.token);
        login({ isLoggedIn: true, isAdmin: decodedJwtTokenObj.roles.includes("admin"), username: response.username })
      })
      .catch(console.error);
    toggleModalLogin();
    history.push("/");
  }

  const performLogin = (evt) => {
    evt.preventDefault();
    handleLogin(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <React.Fragment>
      {isLoggedIn ? (<LoggedIn handleLogout={handleLogout} />) : (<LoggedOut change={onChange} performLogin={performLogin} />)}
    </React.Fragment>
  )

}

function LoggedOut({ performLogin, change }) {
  return (
    <div>
      <h2>Login</h2>
      <form onChange={change} >
        <TextField size="small" id="username" label="User Name" variant="outlined" />
        <TextField size="small" id="password" label="Password" variant="outlined" />
        <Button variant="outlined" color="primary" onClick={performLogin}>Login</Button>
      </form>
    </div>
  )
}

function LoggedIn({ handleLogout }) {
  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}