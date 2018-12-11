import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import request from 'request';
import logo from './logo.svg';
import './Styles/App.css';
import withoutAuth from './Auth';
import AuthRoute from './AuthRoute';
import ProjectsPage from './ProjectsPage';
import Server from './config';
import Header from './Header';

const Auth = withRouter(withoutAuth);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authorized: false}
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const that = this;
    if (token) {
      request.post({
        url: Server.url,
        headers: {
          'x-access-token': token
        }
      },
      function(err,res,body){
        if (err) console.log(err);
        body = JSON.parse(body);
        that.setState({authorized: body.auth});
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            {/*<Link to="/projects">Projects</Link>*/}
            <Redirect from="/" to="projects" />
            <Route name="auth" path="/auth" component={Auth} />
            <AuthRoute name="projects" path="/projects" authorized={false} component={ProjectsPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
