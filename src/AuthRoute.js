import React, {Component} from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";

export default function AuthRoute({component: Component, ...rest }) {
  console.log({...rest});
  return (
    <Route
      {...rest}
      render={props =>
        rest.authorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: rest.path }
            }}
          />
        )
      }
    />
  );
}