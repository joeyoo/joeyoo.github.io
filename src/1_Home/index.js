import React from 'react'
import { List, Grid, GridRow, GridColumn, Container, Button, Icon } from 'semantic-ui-react'

class Home extends React.Component {
  render() {
    return (
      <Grid centered divided textAlign='center' id="home" columns='2'>
        <GridRow divided stretched>
          <GridColumn width='4'>
            <GridRow>
              <Button circular color='linkedin' icon='linkedin' />
              <Button circular color='github' icon='github' />
            </GridRow>
            <GridRow>
              <List centered link>
                <List.Item active>Hello</List.Item>
                <List.Item as='a'>Projects</List.Item>
                <List.Item as='a'>Tutorials</List.Item>
                <List.Item as='a'>Writing</List.Item>
              </List>
            </GridRow>

          </GridColumn>
          <GridColumn width='10' className='home-content'>
            <Container text>
            </Container>
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

export default Home;