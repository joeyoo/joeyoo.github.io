import React, { Component } from 'react';
import { Grid, Image, Step, Icon, Sticky, Container, Header, Menu, Button } from 'semantic-ui-react';
import {withRouter, matchPath} from 'react-router-dom';
import Project from './Project';
import SideMenu from './SideMenu';
import data from './data';

class Projects extends Component {
  constructor(props) {
    super(props);
    matchPath("/path")
  }
	render() {
    const schoolPs = data["School Projects"].map((p, i) => <Project key={i} {...p} />);

		return(
      <Grid centered>
        {schoolPs}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 127"><title>Derek</title><rect y={36} width={150} height={91} rx={36} style={{fill: '#a62a2a'}} /><rect x={71} y={94} width={7} height={2} rx={1} /><rect x={10} width={130} height={47} rx={12} /><circle cx={60} cy={70} r={15} style={{fill: '#fff'}} /><circle cx={90} cy={70} r={15} style={{fill: '#fff'}} /><path d="M0,71V0H0V0H0Z" transform="translate(-27 -8)" style={{fill: '#231f20'}} /><circle cx={60} cy={70} r={5} style={{fill: '#231f20'}} /><circle cx={90} cy={70} r={5} style={{fill: '#231f20'}} /></svg>
      </Grid>
		)
	}
}

export default withRouter(Projects);