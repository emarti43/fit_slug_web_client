import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class ExerciseRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numReps: '',
      numSets: '',
      weight: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.props.submitRequest == 'put') {
      var endpoint = 'exercise_records/' + this.props.exerciseData.exercise_record.id;
      var params = {
        exercise_record: {
          num_reps: this.state.numReps,
          num_sets: this.state.numSets,
          weight: this.state.weight,
        }
      };
    } else {
      var endpoint = 'exercise_records/';
      var params = {
        exercise_record: {
          num_reps: this.state.numReps,
          num_sets: this.state.numSets,
          weight: this.state.weight,
          exercise_id: this.props.exerciseData.id,
        }
      }
    }

    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

  }
  handleFormChange(event) {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-field">
          <input type="text"
          id="numSets"
          name="numSets"
          value={this.state.numSets}
          onChange={this.handleFormChange}/>
          <label htmlFor="numSets"> Number of Sets</label>
        </div>
        <div className="input-field">
          <input type="text"
          id="numReps"
          name="numReps"
          value={this.state.numReps}
          onChange={this.handleFormChange}/>
          <label htmlFor="numReps">
            Number of Reps (Per Set)
          </label>
        </div>
        <div className="input-field">
          <input type="text"
          id="weight"
          name="weight"
          value={this.state.weight}
          onChange={this.handleFormChange}/>
          <label htmlFor="weight">Weight per Rep</label>
        </div>
        <input type="submit" className="waves-effect waves-light btn-flat light-blue-text" value="Submit"/>
    </form>
  );
  }
}
