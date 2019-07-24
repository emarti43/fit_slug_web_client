import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

import Home from './Home';
import Login from './Login';
import About from './About';
import Signup from './Signup';

const axios = require('axios');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          userName: ''
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLoginStatus = this.handleLoginStatus.bind(this);
    }

    handleLoginStatus() {
      var token = localStorage.getItem('fit_slug_session');

      if (token && token != '') {
        axios.get('http://127.0.0.1:3000/api/validate', {headers: {
          'Authorization' : token
        }}).
        then((response => {
          this.setState({userName: response.data.username, isLoggedIn: true});
        })).
        catch((error) => {
          console.log(error);
        });
      }
    }
    componentDidMount() {

    }

    handleLogout(event) {
      this.setState({isLoggedIn: false, userName: ''});
      localStorage.removeItem('fit_slug_session');
    }

    componentWillUnmount() {

    }

    render () {


          return (
            <Router>
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark blue lighten-3">
                <div class='nav-wrapper'>
                 <a class="brand-logo left">Fit Slug</a>
                  <ul className="navbar-nav mr-auto right">
                  <li>{(this.state.userName === '') ?
                  '' : <a>Welcome <b>{this.state.userName} </b> </a>}</li>
                    <li><Link to={'/'} className="nav-link"> Home </Link></li>
                    <li><Link to={'/about'} className="nav-link"> About</Link></li>
                    {this.state.isLoggedIn ?
                      <li>
                      <Link to={'/login'} onClick={this.handleLogout} className="nav-link"> Logout</Link>
                      </li>
                      :
                      <React.Fragment>
                      <li><Link to={'/login'} className="nav-link"> Login </Link></li>
                      <li><Link to={'/signup'} className="nav-link"> Signup</Link></li>
                      </React.Fragment>
                    }
                  </ul>
                </div>
              </nav>

              <hr/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' render={props => <Login {...props} handleLoginStatus={this.handleLoginStatus}/>}/>
                <Route exact path='/signup' render={props => <Signup {...props} handleLoginStatus={this.handleLoginStatus}/>}/>
                <Route exact path='/about' component={About}/>
              </Switch>
            </div>
            </Router>
          );
    }
}
