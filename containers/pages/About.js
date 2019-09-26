import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <div className="parallax-container" style={{height: "300px"}}>
          <div className="parallax">
            <img style={{width: "100%"}} src="https://assets.bonappetit.com/photos/5b69f163d3d14670539a2174/master/pass/ba-tikka-masala-2.jpg"/>
          </div>
        </div>
        <div className="section white">
          <div className="container">
            <h3 className="light-blue-text">About</h3>
            <p>
              FitSlug is a personal project created for educational purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
