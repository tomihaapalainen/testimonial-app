import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../contexts/user";

const SignInRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Component {...props} /> : <Redirect to="/app" />;
      }}
    ></Route>
  );
};

export default SignInRoute;
