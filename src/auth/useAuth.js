import React, { useState, createContext } from "react";

const authContext = createContext();

const useAuth = () => {
  const [auth, setAuth] = useState(-1);

  return {
    auth,
    authHandler() {
      const isLogged = localStorage.getItem("isLogged");
      switch (isLogged) {
        case "true":
          setAuth(true);
          break;
        case "false":
          setAuth(false);
          break;
        default:
          setAuth(false);
      }
    },
    authLogin() {
      setAuth(true);
      localStorage.setItem("isLogged", "true");
    },
    authLogout() {
      setAuth(false);
      localStorage.removeItem("isLogged");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
  };
};

const AuthProvider = props => {
  const { auth, authHandler, authLogin, authLogout } = useAuth();

  return (
    <authContext.Provider value={{ auth, authHandler, authLogin, authLogout }}>
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };