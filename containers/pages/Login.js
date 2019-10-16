import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import RequestTemplate from '../utils/RequestTemplate';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      unsuccessfulSubmit: false,
      successfulLogin: false,
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    var payload = {
      user:
        {
        name: this.state.username,
        password: this.state.password,
        }
    };
    RequestTemplate.genericRequest('post', 'login', payload)
    .then((response) => {
      if (response.status != 200) {
        console.log('404 response');
      } else {
        localStorage.setItem('fit_slug_session', response.data.token);
        this.props.handleLoginStatus();
        this.setState({ successfulLogin: true });
      }
    })
    .catch((error) => {
      this.setState({unsuccessfulSubmit: true});
      console.log(error);
    });
  }

  render() {
    if (this.state.successfulLogin || this.props.isLoggedIn) {
      return <Redirect to="/"/>
    }
    return (
      <div className='row container'>
        <h4> Login </h4>
        <form className='col s6' onSubmit={this.handleFormSubmit}>
          {this.state.unsuccessfulSubmit ? <a className="red-text"> Unsuccessful Login. Please try again</a>: ''}
          <div className='input-field col s6'>
            <input type="text" id='username'
            name='username' className="validate"
            value={this.state.username}
            onChange={this.handleFormChange}/>
            <label htmlFor='username'
            className='active'> Username </label>
          </div>

          <div className='input-field col s6'>
            <input type="password"
            id='password'
            name= 'password'
            className="validate"
            value={this.state.password}
            onChange={this.handleFormChange}/>
            <label htmlFor='password'
            className='active'>
              Password
            </label>
          </div>

          <div className="row">
            <input type="submit"
            className="btn waves-effect waves-light blue white-text"
            value="Submit"/>
          </div>

        </form>
       </div>
    );
  }
}

export default Login;
