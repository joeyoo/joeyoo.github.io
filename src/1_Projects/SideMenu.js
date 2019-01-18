import React, { Component } from 'react'
import { Accordion, Form, Menu, Step, Icon, Rail, Segment } from 'semantic-ui-react'

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    const index = parseInt(e.target.id);
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Step.Group fluid vertical>
        <Step active={activeIndex === 0} id={0} onClick={this.handleClick} >
          <Icon name='id card outline' id={0} onClick={this.handleClick} />
          <Step.Content>
            <Step.Title id={0} onClick={this.handleClick} >Cover Letter</Step.Title>
          </Step.Content>
        </Step>

        <Step active={activeIndex === 1} id={1} onClick={this.handleClick} >
          <Icon name='wordpress forms' id={1} onClick={this.handleClick} />
          <Step.Content>
            <Step.Title id={1} onClick={this.handleClick}>Resume</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    )
  }
}