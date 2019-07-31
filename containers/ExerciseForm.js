import React, {Component} from 'react';
import RequestTemplate from './RequestTemplate';
import ExerciseFormMuscles from './ExerciseFormMuscles';

export default class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.state = {
      muscles: [],
    }

  }
  handleFormChange(event) {

  }
  handleSubmit(event) {

    event.preventDefault();
  }
  componentDidMount() {
    RequestTemplate.genericRequest('get','muscles')
    .then((response) => {
      this.setState({
        muscles: response.data.map((muscle) => muscle)
      });
      console.log(muscles);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const muscleCheckboxes = this.state.muscles.map((muscle, i) =>
    <ExerciseFormMuscles key={i} muscle={muscle} handleFormChange={this.handleFormChange}/>);
    return (
      <div className="card">
        <span className="card-title">Create Exercise</span>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <label htmlFor="exerciseName">Name of Exercise</label>
            <input type="text"></input>
          </div>
          <div className="row">{muscleCheckboxes}</div>
          <input type="submit" className="waves-effect waves-teal btn-flat" value="Submit"/>
        </form>
      </div>
    );
  }
}
