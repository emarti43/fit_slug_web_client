import React, { Component } from 'react';
import { instanceOf } from 'prop-types';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      email: '',
      isLoggedIn: false,
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
    console.log('attempting to login');
    var token = localStorage.getItem('fit_slug_session');
    if (!token || token === '') {
      console.log('no session found');
    } else {
      console.log(token);
    }
    axios.post('http://127.0.0.1:3000/api/login', {
      user: {
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        email: this.state.email,
      }
    })
    .then((response) => {
      if (response.status != 200) {
        console.log('404 response');
      } else {
        console.log(response.data.token);
        localStorage.setItem('fit_slug_session', response.data.token);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="card">
        <h5>{this.state.isLoggedIn}</h5>
        <form onSubmit={this.handleFormSubmit}>
        <ul>
          <li>
          <input type="text" name='username' value={this.state.username} onChange={this.handleFormChange}/>
          <label> Username </label>
          </li>

          <li>
          <input type="text" name='email' value={this.state.email} onChange={this.handleFormChange}/>
          <label> Email </label>
          </li>

          <li>
          <input type="password" name= 'password' value={this.state.password} onChange={this.handleFormChange}/>
          <label> Password </label>
          </li>

          <li>
          <input type="password" name= 'password_confirmation' value={this.state.password_confirmation} onChange={this.handleFormChange}/>
          <label> Confirm Password </label>
          </li>

          <li>
          <input type="submit" className="waves-effect waves-light btn blue" value="Submit"/>
          </li>
        </ul>

        </form>
       </div>
    );
  }
}

export default Login;
