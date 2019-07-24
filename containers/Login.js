import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    axios.post('http://127.0.0.1:3000/api/login', {
      user: {
        username: this.state.username,
        password: this.state.password,
      }
    })
    .then((response) => {
      if (response.status != 200) {
        console.log('404 response');
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
      <div class='row'>
        <h5>{this.state.isLoggedIn}</h5>
        <form class='col s12' onSubmit={this.handleFormSubmit}>

          <div class='row'>
          <div class='input-field col s12'>
          <input type="text" id='username' name='username' class="validate" value={this.state.username} onChange={this.handleFormChange}/>
          <label for='username' class='active'> Username </label>
          </div>
          </div>

          <div class='row'>
          <div class='input-field col s12'>
          <input type="password" id='password' name= 'password' class="validate" value={this.state.password} onChange={this.handleFormChange}/>
          <label for='password' class='active'> Password </label>
          </div>
          </div>

          <div class='row'>
          <div>
          <input type="submit" onClick={this.props.handleLoginStatus} className="waves-effect waves-light btn blue" value="Submit"/>
          </div>
          </div>

        </form>
       </div>
    );
  }
}

export default Login;
