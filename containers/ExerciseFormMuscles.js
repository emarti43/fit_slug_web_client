import React, {Component} from 'react';

export default class ExerciseFormMuscles extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div className="col s6">
        <label htmlFor={this.props.muscle.id}>
          <input type="checkbox" id={this.props.muscle.id} className="filled-in" onChange={this.props.handleFormChange}/>
          <span>{this.props.muscle.name}</span>
        </label>
      </div>);
  }
};
