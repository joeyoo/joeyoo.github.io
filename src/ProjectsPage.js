import React, { Component } from 'react';
// import Header from './Header';
import { Grid, Image, Step, Icon, Segment, Container, Header } from 'semantic-ui-react';

import Project from './Projects/Project';
import SideMenu from './Projects/SideMenu';
import img from './assets/portrait.jpg';

class ProjectsPage extends Component {
	render() {
		return(

  <Grid columns={2}>
    <Grid.Column width={5}>
    <SideMenu />
    </Grid.Column>

    <Grid.Column width={11}>
    	<Project />
    </Grid.Column>
  </Grid>
			// </div>
		)
	}
}

export default ProjectsPage;