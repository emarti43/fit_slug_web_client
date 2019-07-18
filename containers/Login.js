import React, { Component } from 'react';
const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      email: '',
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  toggleLoginForm() {

  }
  handleFormSubmit(event) {
    event.preventDefault();
    console.log('attempting to login');
    axios.get('http://127.0.0.1:3000/api/sessions/login')
    .then((response) => {
      this.setState({mealRecordList: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
        <form>

          <input type="text" name='username' value={this.state.username} onChange={this.handleFormChange}/>
          <label> Username </label>

          <input type="text" name='email' value={this.state.email} onChange={this.handleFormChange}/>
          <label> Email </label>

          <input type="password" name= 'password' value={this.state.password} onChange={this.handleFormChange}/>
          <label> Password </label>

          <input type="password" name= 'password_confirmation' value={this.state.password_confirmation} onChange={this.handleFormChange}/>
          <label> Confirm Password </label>

        </form>
    );
  }
}

export default Login;
