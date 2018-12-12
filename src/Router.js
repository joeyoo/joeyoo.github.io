import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import request from 'request-promise';
import './Styles/App.css';
import Auth from './Auth/Auth';
import ProjectsPage from './Projects/ProjectsPage';
import Server from './config';

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      path: '/',
      authToAuth: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const pAuth = props.authorized,
          pPath = props.location.pathname,
          sAuth = state.authorized,
          sPath = state.path,
          newState = {};

    if (pAuth == sAuth && pPath == sPath) return null;
    if (pAuth != sAuth) newState.authorized = pAuth;
    if (pPath != sPath) newState.path = pPath;
    if (pPath == '/auth' && sPath == '/auth' && pAuth == true) newState.authToAuth = true;
    return newState;
  }

  render() {
    const p = Object.assign(this.state, this.props);
    console.log(p);
    return (
      <Route
        {...p}
        render={ props =>
          this.state.authorized && !this.state.authToAuth
            ? (<Component {...props} />)
            : ((this.state.authToAuth) ? (<Redirect to="projects" from={this.state.path} />) :(<Redirect to="auth" from={this.state.path} />))
        }
      />
    );
  }
}

const ARoute = withRouter(AuthRoute);

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {authorized: false};
    this._checkToken();
  }

  async _checkToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await request({method: "GET", url: Server.url, json: true, qs: {access_token: token}});
      this.setState({authorized: res.auth});
    }
    catch(err) {
      console.error(err);
    }
  }

  render() {
    const {authorized} = this.state;
    return (
      <BrowserRouter>
        <div>
          <Redirect from="/" to="projects" />
          <ARoute name="projects"
                     path="/projects"
                     component={ProjectsPage}
                     authorized={authorized} />
          <ARoute name="auth"
                     path="/auth"
                     component={Auth}
                     authorized={authorized} />
        </div>
      </BrowserRouter>
    );
  }
}