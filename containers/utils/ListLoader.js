import React from 'react';

export default class ListLoader extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return(
    <div className="preloader-wrapper big active center-align">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    );
  }
}
