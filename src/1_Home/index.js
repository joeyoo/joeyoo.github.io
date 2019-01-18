import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Menu, Label} from 'semantic-ui-react'

class MenuE extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing secondary vertical>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
        Home
        <Icon link name='unlock' fitted />
        </Menu.Item>
        <Menu.Item
          name='projects'
          active={activeItem === 'projects'}
          onClick={this.handleItemClick}
        >
        Projects
        <Icon link name='lock' fitted />
        </Menu.Item>
        <Menu.Item
          name='resume'
          active={activeItem === 'resume'}
          onClick={this.handleItemClick}
        >
        Resume
        <Icon link name='lock' fitted />
        </Menu.Item>
      </Menu>
    )
  }
}

const LoginForm = () => (
  <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' id='home-header' textAlign='center'>
          Hi, I'm Joseph Yoo.
        </Header>
        <MenuE />
        <div>
          <Icon link name='github' />
          <Icon link name='linkedin' />
        </div>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginForm