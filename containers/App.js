import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Signup from './pages/Signup';
import RequestTemplate from './utils/RequestTemplate'

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
      RequestTemplate.genericRequest('get', 'validate')
      .then((response => {
        if (response.status === 200) {
          this.setState(
            {
            userName: response.data.username,
            isLoggedIn: true
            }
          );
        }
      }))
      .catch((error => {
        console.log(error);
        this.handleLogout();
      }));
    }

    handleLogout(event) {
      this.setState({isLoggedIn: false, userName: ''});
      localStorage.removeItem('fit_slug_session');
    }

    componentWillMount() {
      this.handleLoginStatus();
    }

    render () {
      if (this.state.isLoggedIn) {
        var loginNavBar =
        <li>
           <Link to={'/login'}
              onClick={this.handleLogout}
              className="nav-link">
             Logout
           </Link>
        </li>;
        var userWelcome =
        <li>
          <a> Welcome <b> {this.state.userName} </b> </a>
        </li>;
      } else {
        var loginNavBar =
        <React.Fragment>
          <li>
            <Link to={'/login'}
              className="nav-link">
                Login
            </Link>
          </li>
          <li>
          <Link to={'/signup'} className="nav-link"> Signup</Link></li>
        </React.Fragment>;
        var userWelcome = '';
      }
      return (
        <Router>
          <div>
            <nav className='navbar navbar-dark light-blue'>
              <div className='nav-wrapper container'>
                <a className='brand-logo left'>
                Fit Slug
                </a>
                <ul id='nav-mobile'className="right">
                  {userWelcome}
                  <li>
                    <Link to={'/'}
                    className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={'/about'} className="nav-link">
                    About
                    </Link>
                  </li>
                  {loginNavBar}
                </ul>
              </div>
            </nav>
            <Switch>
              <Route exact path='/'
                render={props => <Home {...props} isLoggedIn={this.state.isLoggedIn}/>}/>
              <Route exact path='/login' render={props => <Login {...props}
                handleLoginStatus={this.handleLoginStatus}
                isLoggedIn={this.state.isLoggedIn}/>}/>
              <Route exact path='/signup' render={props => <Signup {...props}
                handleLoginStatus={this.handleLoginStatus}
                isLoggedIn={this.state.isLoggedIn}/>}/>
              <Route exact path='/about' component={About}/>
            </Switch>
            <footer className="page-footer light-blue">
              <div className="container">
                <div className="row">
                  <div className="col l6 s12">
                    <h5>Fit Slug</h5>
                  </div>
                </div>
              </div>
              <div className="footer-copyright">
                <div className="container">
                  Made by emarti43
                </div>
              </div>
            </footer>
          </div>
        </Router>
      );
    }
}
