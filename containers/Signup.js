import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';

const axios = require('axios');

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      email: '',
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
    axios.post('http://127.0.0.1:3000/api/signup', {
      user: {
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        email: this.state.email,
      }
    })
    .then((response) => {
      if (response.status != 200) {
      } else {
        localStorage.setItem('fit_slug_session', response.data.token);
        this.props.history.push('/');
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
        <div class= 'row'>
          <input type="text" id='username' name='username' value={this.state.username} onChange={this.handleFormChange}/>
          <label for='username' class='active'> Username </label>
        </div>

        <div class='row'>
          <input type="text" id='email' name='email' value={this.state.email} onChange={this.handleFormChange}/>
          <label for='email' class='active'> Email </label>
        </div>

        <div class='row'>
          <input type="password" id='password'name= 'password' value={this.state.password} onChange={this.handleFormChange}/>
          <label for='password' class='active'> Password </label>
        </div>

        <div class='row'>
          <input type="password" id='password_confirmation' name= 'password_confirmation' value={this.state.password_confirmation} onChange={this.handleFormChange}/>
          <label for='password_confirmation' class='active'> Confirm Password </label>
        </div>

        <div class='row'>
          <input type="submit" onClick={this.props.handleLoginStatus} className="waves-effect waves-light btn blue" value="Submit"/>
        </div>

        </form>
       </div>
    );
  }
}
export default Signup;
