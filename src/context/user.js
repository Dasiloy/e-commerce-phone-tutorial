import React, { useContext, useState } from "react";

const localData = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {
        username: null,
        token: null,
      };
};

export const UserContext = React.createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(localData());
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const userLogIn = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogOut = (user) => {
    setUser({
      username: null,
      token: null,
    });
    localStorage.removeItem("user", JSON.stringify(user));
  };

  const showAlert = (show, msg, type) => {
    setAlert({ show, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <UserContext.Provider
      value={{
        userLogIn,
        userLogOut,
        user,
        alert,
        showAlert,
        hideAlert,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
