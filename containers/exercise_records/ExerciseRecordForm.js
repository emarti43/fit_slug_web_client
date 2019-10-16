import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class ExerciseRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numReps: '',
      numSets: '',
      weight: '',
      unsuccessfulSubmit: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let params = {
      exercise_record: {
        num_reps: this.state.numReps,
        num_sets: this.state.numSets,
        weight: this.state.weight,
      }
    }

    let endpoint = `exercise_records/${this.props.submitRequest === 'put' ?  this.props.exerciseData.exercise_record.id : ''}`;

    if (this.props.submitRequest === 'post') params = { exercise_record: { ...params.exercise_record, exercise_id: this.props.exerciseData.id }};

    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) => {
      if (response.status === 200) {
        params.exercise_record.id = this.props.exerciseData.exercise_record.id;
        this.props.updateRecord(params);
      }
      this.props.toggleExerciseRecordForm(event);
    })
    .catch((error) => {
      console.log(error);
      this.setState({unsuccessfulSubmit: true});
    });

  }

  handleFormChange(event) {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.unsuccessfulSubmit ? <a className="red-text"> Unsuccessful Submit. Please try again</a>: ''}
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
