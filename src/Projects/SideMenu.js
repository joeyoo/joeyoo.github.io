import React, { Component } from 'react'
import { Accordion, Form, Menu, Step, Icon } from 'semantic-ui-react'

const SizeForm = (
  <Step.Group vertical fluid>
    <Step>
      <Step.Content>
        <Step.Title>Education</Step.Title>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
        <Step.Title>Professional Experience</Step.Title>
      </Step.Content>
    </Step>

    <Step active>
      <Step.Content>
        <Step.Title>Projects</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
)


export default class AccordionExampleMenu extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Step.Group fluid vertical>

        <Step>
          <Icon name='id card outline'/>
          <Step.Content>
            <Step.Title>Cover Letter</Step.Title>
          </Step.Content>
        </Step>

        <Step>
          <Icon name='wordpress forms' />
          <Step.Content>
            <Step.Title>Resume</Step.Title>
          </Step.Content>
        </Step>

        <Step active>
          <Icon name='wordpress forms' />
          <Step.Content>
            <Step.Title>Resume</Step.Title>
            <Accordion vertical>
                <Accordion.Title
                  active={activeIndex === 2}
                  index={0}
                  onClick={this.handleClick}
                />
                <Accordion.Content active={activeIndex === 0} content={SizeForm} />
            </Accordion>
          </Step.Content>
        </Step>

      </Step.Group>

    )
  }
}