import React, { Component } from 'react';
import request from 'request-promise';
import {ServerURL} from '../0_config';
import {withRouter} from 'react-router-dom';
import { Button, Form, Placeholder, Reveal, Grid, Icon, Popup, Container, Item, Image} from 'semantic-ui-react';
import portrait from '../portrait.png';

const GateKeeper = ({active, disabled, eye, eye2, ...props}) => (
  <Reveal active={active} disabled={disabled} animated="move" style={{width: "75px"}} >
    <Reveal.Content visible>
        <div style={{backgroundColor: "#282c34", height: "50px", width: "75px", border: "inset 1px #212630"}}></div>
    </Reveal.Content>
    <Reveal.Content hidden>
      <div className='eyeContainer'>
        <div id={eye}></div>
        <div id={eye2}></div>
        <path d="M128.21,71H75.79C73.71,71,72,68.87,72,66.26v-.52C72,63.13,73.71,61,75.79,61h52.42c2.08,0,3.79,2.13,3.79,4.74v.52C132,68.87,130.29,71,128.21,71Z" id="brows"></path>
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

  async _checkToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await request({method: "GET", url: ServerURL, json: true, qs: {access_token: token}});
      if (res.auth === true) {
        this.setState({active: true, authorized: true});
        const t = this;
        setTimeout(function() {
          t.setState({active: false});
        }, 1500);
        setTimeout(function() {
          t.props.history.push({pathname: '/projects', state: {authorized: true}});
        }, 2200);
      }
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
      const res = await request({method: "POST", uri: ServerURL, json: true, body: {password: this.state.value}});
      if (res.auth === true) {
        this.setState({active: true, authorized: true});
        const t = this;
        setTimeout(function() {
          t.setState({active: false});
        }, 1500);
        setTimeout(function() {
          t.props.history.push({pathname: '/projects', state: {authorized: true}});
        }, 2200);
        localStorage.setItem('token', res.token);
      }
    }
    catch(err) {
      this.setState({value: ''});
    }
  }

  render() {
    const {Group, Input} = Form;
    const eye = this.state.authorized === true ? "eyeC" : "eye",
          eye2 = this.state.authorized === true ? "eye2C" : "eye2";
    return (
        <div>
            <Popup trigger={<Icon name='help' className='help circle'/>} hoverable position='left center'>
                <Item>
                  <Item.Content>
                    <Item.Description>
                      I'm Joseph Yoo, and you've reached the entrance to my intensely guarded portfolio. For the sake of privacy, you will need to know the secret word to continue.
                    </Item.Description>
                  </Item.Content>
                </Item>
            </Popup>

            <GateKeeper active={this.state.active} disabled={this.state.disabled} eye={eye} eye2={eye2}/>
            <Form onSubmit={this.handleSubmit} autoComplete="off">
              <Group>
                <Input onFocus={this.handleFocus} onBlur={this.handleBlur} type="password" name="password" value={this.state.value} onChange={this.handleChange} placeholder="Secret word?"/>
                <Button type='submit'>Submit</Button>
              </Group>
            </Form>
        </div>

    );
  }
}

export default withRouter(Auth);