import React, { useReducer, createContext } from "react";
export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  username: "username"
}

const AUTH_LOGIN = "AUTH_LOGIN";
const AUTH_LOGOUT = "AUTH_LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        isLoggedIn: action.payload.isLoggedIn,
        isAdmin: action.payload.isAdmin,
        username: action.payload.username
      }
    case AUTH_LOGOUT:
      return {
        isLoggedIn: false,
        isAdmin: false
      }
    default:
      return state;
  }
}

export const AuthProvider = ({children}) => {
  const [auth, dispatch] = useReducer(reducer, initialState);

  const login = ({isLoggedIn, isAdmin, username}) => {
    dispatch({
      type: AUTH_LOGIN,
      payload: {
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        username: username
      }
    })
  }

  const logout = () => {
    dispatch({
      type: AUTH_LOGOUT
    })
  }

  const value = {auth, login, logout};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}