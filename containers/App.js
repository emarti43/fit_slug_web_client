import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import About from './About';

const axios = require('axios');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

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
                    <li><Link to={'/'} className="nav-link"> Home </Link></li>
                    <li><Link to={'/login'} className="nav-link"> Login</Link> </li>
                    <li><Link to={'/about'} className="nav-link"> About</Link> </li>
                  </ul>
                </div>
              </nav>
              <hr/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/about' component={About}/>
              </Switch>
            </div>
            </Router>
          );
    }
}
