import React from "react";
import { Redirect,Route } from "react-router";
 import { useUserContext } from "../context/user";

export default function PrivateRoute({ children, ...rest }) {
  const {user} = useUserContext()
  return <Route {...rest} render={() => {
    return user.token ? children : <Redirect to='/login'/>
  }}>
  </Route>
}
