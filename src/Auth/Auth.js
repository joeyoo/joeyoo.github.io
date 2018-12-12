import React, { Component } from 'react';
import request from 'request-promise';
import Server from '../config';
import {withRouter} from 'react-router-dom';
import { Button, Form, Placeholder, Reveal } from 'semantic-ui-react';

const GateKeeper = ({active, disabled, ...props}) => (
  <Reveal active={active} disabled={disabled} animated="move left" style={{width: "75px"}} >
    <Reveal.Content visible>
        <div style={{backgroundColor: "#282c34", height: "50px", width: "75px", border: "inset 1px #212630"}}></div>
    </Reveal.Content>
    <Reveal.Content hidden>
      <div className='eyeContainer'>
        <div id='eye'></div>
        <div id='eye2'></div>
        <div id='brows'></div>
      </div>
    </Reveal.Content>
  </Reveal>
);

const transform = (ele, name, value, unit) => {
  ele.style.transform = name + '(' + value + unit + ')';
  ele.style.webkitTransform = name + '(' + value + unit + ')';
  ele.style.mozTransform = name + '(' + value + unit + ')';
  ele.style.msTransform = name + '(' + value + unit + ')';
  ele.style.oTransform = name + '(' + value + unit + ')';
}

class Auth extends Component {
	constructor(props) {
    super(props);
    this.state = {value: '', active: false, disabled: true, alreadyAuthenticated: false, authorized: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this._checkToken();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.authorized) {
      this.props.history.push('/projects');
      return false;
    }
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

  handleChange(e) {
    this.setState({value: e.target.value});
    var add = e.target.selectionStart,
        charWidth = parseInt(window.getComputedStyle(e.target).getPropertyValue("font-size")) * 0.15,
        x = (add * charWidth);

    var eye = document.getElementById("eye"),
        eye2 = document.getElementById("eye2");

    var left = e.target.parentNode.getBoundingClientRect().left,
        rot1 = (Math.atan2((left + x) - eye.getBoundingClientRect().left, e.target.getBoundingClientRect().top - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180,
        rot2 = (Math.atan2((left + x) - eye.getBoundingClientRect().left, e.target.getBoundingClientRect().top - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180;

    transform(eye, 'rotate', rot1, 'deg');
    transform(eye2, 'rotate', rot2, 'deg');
  }

  handleFocus(event) {
    this.setState((state, props) => ({
      active: true
    }));
    var eye = document.getElementById("eye"),
        eye2 = document.getElementById("eye2"),
        rotI = (Math.atan2(event.target.getBoundingClientRect().left - eye.getBoundingClientRect().left, event.target.getBoundingClientRect().top - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180;

    transform(eye, 'rotate', rotI, 'deg');
    transform(eye2, 'rotate', rotI, 'deg');

    document.body.onmousemove = function(e) {
      var rot = (Math.atan2(e.pageX - eye.getBoundingClientRect().left, e.pageY - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180,
          rot2 = (Math.atan2(e.pageX - eye2.getBoundingClientRect().left, e.pageY - eye2.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180;

      transform(eye, 'rotate', rot, 'deg');
      transform(eye2, 'rotate', rot2, 'deg');
    }
  }

  handleBlur(e) {
    this.setState((state, props) => ({
      active: false,
      disabled: true
    }));
    document.body.onmousemove = null;
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await request({method: "POST", uri: Server.url, json: true, body: {password: this.state.value}});
      if (res.auth === true) {
        localStorage.setItem('token', res.token);
        this.props.history.push('/projects');
      }
    }
    catch(err) {console.error(err)}
  }

  render() {
    const {Group, Input} = Form;
    return (
      <div>
        <GateKeeper active={this.state.active} disabled={this.state.disabled} />
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          <Group>
            <Input onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" name="password" value={this.state.value} onChange={this.handleChange} placeholder="Secret word?"/>
            <Button type='submit'>Submit</Button>
          </Group>
        </Form>
      </div>
    );
  }
}

export default withRouter(Auth);