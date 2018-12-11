import React, { Component } from 'react';
import request from 'request';
import Server from './config';
import { Button, Form, Placeholder, Reveal } from 'semantic-ui-react';

const GateKeeper = ({active, disabled, ...props}) => (
  <Reveal active={active} disabled={disabled} animated='move left' style={{width: "75px"}} >
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

class Auth extends Component {
	constructor(props) {
    super(props);
    this.state = {value: '', active: false, disabled: true};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    var add = e.target.selectionStart,
        charWidth = parseInt(window.getComputedStyle(e.target).getPropertyValue("font-size")) * 0.1,
        x = (add * charWidth);

    var eye = document.getElementById("eye"),
        eye2 = document.getElementById("eye2"),
        left = e.target.parentNode.getBoundingClientRect().left,
        rot1 = (Math.atan2((left + x) - eye.getBoundingClientRect().left, e.target.getBoundingClientRect().top - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180,
        rot2 = (Math.atan2((left + x) - eye.getBoundingClientRect().left, e.target.getBoundingClientRect().top - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180;
    eye.style.transform = 'rotate(' + rot1 + 'deg)';
    eye.style.webkitTransform = 'rotate(' + rot1 + 'deg)';
    eye.style.mozTransform = 'rotate(' + rot1 + 'deg)';
    eye.style.msTransform = 'rotate(' + rot1 + 'deg)';
    eye2.style.transform = 'rotate(' + rot2 + 'deg)';
    eye2.style.webkitTransform = 'rotate(' + rot2 + 'deg)';
    eye2.style.mozTransform = 'rotate(' + rot2 + 'deg)';
    eye2.style.msTransform = 'rotate(' + rot2 + 'deg)';
  }

  handleFocus(event) {
    this.setState((state, props) => ({
      active: true
    }));
    var eye = document.getElementById("eye"),
        eye2 = document.getElementById("eye2"),
        rotI = (Math.atan2(event.target.getBoundingClientRect().left - eye.getBoundingClientRect().left, event.target.getBoundingClientRect().top - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180;
    eye.style.transform = 'rotate(' + rotI + 'deg)';
    eye.style.webkitTransform = 'rotate(' + rotI + 'deg)';
    eye.style.mozTransform = 'rotate(' + rotI + 'deg)';
    eye.style.msTransform = 'rotate(' + rotI + 'deg)';
    eye2.style.transform = 'rotate(' + rotI + 'deg)';
    eye2.style.webkitTransform = 'rotate(' + rotI + 'deg)';
    eye2.style.mozTransform = 'rotate(' + rotI + 'deg)';
    eye2.style.msTransform = 'rotate(' + rotI + 'deg)';
    document.body.onmousemove = function(e) {
      var rot = (Math.atan2(e.pageX - eye.getBoundingClientRect().left, e.pageY - eye.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180,
          rot2 = (Math.atan2(e.pageX - eye2.getBoundingClientRect().left, e.pageY - eye2.getBoundingClientRect().top) * (180 / Math.PI) * -1) + 180;
      eye.style.transform = 'rotate(' + rot + 'deg)';
      eye.style.webkitTransform = 'rotate(' + rot + 'deg)';
      eye.style.mozTransform = 'rotate(' + rot + 'deg)';
      eye.style.msTransform = 'rotate(' + rot + 'deg)';
      eye2.style.transform = 'rotate(' + rot2 + 'deg)';
      eye2.style.webkitTransform = 'rotate(' + rot2 + 'deg)';
      eye2.style.mozTransform = 'rotate(' + rot2 + 'deg)';
      eye2.style.msTransform = 'rotate(' + rot2 + 'deg)';
    }
  }

  handleBlur(e) {
    this.setState((state, props) => ({
      active: false,
      disabled: true
    }));
    document.body.onmousemove = null;
  }

  handleSubmit(event) {
    event.preventDefault();
    const that = this;

  	request.post({
  		url: Server.url,
  		form: {password: this.state.value}
  	},
  	function(err,res,body){
  		if (err) console.log(err);
  		body = JSON.parse(body);
  		console.log(body);
  		if (body.auth === true) {
  			localStorage.setItem('token', body.token);
        that.props.history.push('/projects');
  		}
  	});
  }

  render() {
    const {Group, Input} = Form;
    return (
      <div>
        <GateKeeper active={this.state.active} disabled={this.state.disabled} />
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <Group>
            <Input onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" name="password" value={this.state.value} onChange={this.handleChange} placeholder="Secret word?"/>
            <Button type='submit'>Submit</Button>
          </Group>
        </Form>
      </div>
    );
  }
}

export default Auth;