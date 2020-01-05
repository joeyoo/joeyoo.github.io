import React, { Component } from 'react';
import { matchPath, withRouter } from 'react-router-dom';
import request from 'request-promise';
import { Table } from 'semantic-ui-react';
import { ServerURL } from '../0_config';
import Project from './Project';

class Projects extends Component {
  constructor(props) {
    super(props);
    matchPath("/path")
    document.body.className = ""
    this.state = {projects: []}
  }

  componentDidMount() {
    this._getProjects();
  }

  async _getProjects() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await request({method: "GET", url: ServerURL +"/projects", json: true, qs: {access_token: token}});
      this.setState({projects: res})
    }
    catch(err) {
      console.error(err);
    }
  }
	render() {

		return(
      <Table celled selectable>
        <Table.Header fullWidth>
          <Table.Row textAlign='center'>
            <Table.HeaderCell colSpan='16'>Projects</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.HeaderCell>Links</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.projects.map((p, i) => <Project key={i} {...p} />)}
        </Table.Body>
      </Table>
		)
	}
}

export default withRouter(Projects);