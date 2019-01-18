import React, { Component } from 'react';
import { BrowserRouter, Route as BrowserRoute, Redirect, withRouter, Switch } from "react-router-dom";
import {Grid, Container, Button, Sticky} from 'semantic-ui-react';
import request from 'request-promise';

import {ServerURL} from './0_config';
import Auth from './1_Auth';
import Projects from './1_Projects';
import Home from './1_Home';


class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: props.authorized || false,
      path: props.path || '/',
      component: props.component || null,
      authToAuth: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const pAuth = props.authorized,
          pPath = props.location.pathname,
          sAuth = state.authorized,
          sPath = state.path,
          newState = {};

    if (pAuth === sAuth && pPath === sPath) return null;
    if (pAuth !== sAuth) newState.authorized = pAuth;
    if (pPath !== sPath) newState.path = pPath;
    if (pPath === '/auth' && sPath === '/auth' && pAuth === true) newState.authToAuth = true;
    return newState;
  }

  render() {
    const p = Object.assign(this.state, this.props);
    return (
      <BrowserRoute
        {...p}
        render={ props =>
          this.state.authorized && !this.state.authToAuth
            ? (<Component {...props} />)
            : ((this.state.authToAuth && this.state.authorized)
              ? (<Redirect to={{
                pathname: '/projects',
                state: {
                  referrer: props.path,
                  authorized: props.authorized
                }}} from={this.state.path} />)
              : (<Redirect to="auth" from={this.state.path} />))
        }
      />
    );
  }
}

const Route = withRouter(AuthRoute);
/*
  Router will serve as Store
*/
export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {authorized: false};
    this._checkToken();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.authorized !== nextState.authorized;
  }

  async _checkToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await request({method: "GET", url: ServerURL, json: true, qs: {access_token: token}});
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
          <Switch>
            {/*<BrowserRoute path="/" component={Home} />*/}
            <BrowserRoute path="/auth" component={Auth}/>
            <Route path={"/projects"}
                 component={Projects}
                 authorized={authorized} />
            <Route component={Auth}/>
          </Switch>
        </BrowserRouter>
    );
  }
}