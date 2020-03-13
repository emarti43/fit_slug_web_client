import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import RequestTemplate from '../utils/RequestTemplate';

const axios = require('axios');

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      email: '',
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
      user: {
        name: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        email: this.state.email,
      }
    };
    RequestTemplate.genericRequest('post', 'signup', payload)
    .then((response) => {
      if (response.status === 201) {
        localStorage.setItem('fit_slug_session', response.data.token);
        this.props.handleLoginStatus();
        this.setState({ successfulLogin: true });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    if (this.props.isLoggedIn) return <Redirect to="/"/>
    return (
      <div className="container row">
        <h5> Sign Up</h5>
        <form onSubmit={this.handleFormSubmit}>
        <div className= 'input-field col s6'>
          <input type="text"
          id='username'
          name='username'
          value={this.state.username}
          onChange={this.handleFormChange}/>
          <label htmlFor='username'
          className='active'>
            Username
          </label>
        </div>

        <div className='input-field col s6'>
          <input type="text"
          id='email'
          name='email'
          value={this.state.email}
          onChange={this.handleFormChange}/>
          <label htmlFor='email'
          className='active'>
            Email
          </label>
        </div>

        <div className='input-field col s6'>
          <input type="password"
          id='password'
          name='password'
          value={this.state.password}
          onChange={this.handleFormChange}/>
          <label htmlFor='password'
          className='active'>
            Password
          </label>
        </div>

        <div className='input-field col s6'>
          <input type="password"
          id='password_confirmation'
          name='password_confirmation'
          value={this.state.password_confirmation}
          onChange={this.handleFormChange}/>
          <label htmlFor='password_confirmation'
          className='active'>
            Confirm Password
          </label>
        </div>

        <div className='input-field col s6'>
          <input type="submit"
          className="waves-effect waves-light btn blue" value="Submit"/>
        </div>

        </form>
       </div>
    );
  }
}
export default Signup;
