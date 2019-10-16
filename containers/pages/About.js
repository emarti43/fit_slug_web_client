import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <div className="parallax-container" style={{height: "300px"}}>
          <div className="parallax">
            <img style={{width: "100%"}} src="/food.jpg"/>
          </div>
        </div>
        <div className="section white">
          <div className="container">
            <h3 className="light-blue-text">About</h3>
            <p>
              FitSlug is a personal project created for educational purposes.This application can track a user's meal information, totalling up their calories through the course of the day. It also logs additional information about the user's exercise habits. This project rebuilds on the last iteration of this project, which ran on web2py. I was able to rebuild the service by separating the API and web client. This client is a single page application on React, communicating with the Rails FitSlug API to do manage logins, record updates, etc.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
