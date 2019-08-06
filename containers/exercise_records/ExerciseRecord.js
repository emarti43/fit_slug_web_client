import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class ExerciseRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showForm: false,
          num_reps: '',
          num_sets: '',
          weight: '',
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
    toggleForm (event) {
      event.preventDefault();
      this.setState( { showForm: !this.state.showForm } );
    }
    handleSubmit (event) {
      event.preventDefault();
      event.preventDefault();
      RequestTemplate.genericRequest('put',
      'exercise_records/' + this.props.exerciseData.exercise_record.id,
      {
        exercise_record: {
          num_reps: this.state.num_reps,
          num_sets: this.state.num_sets,
          weight: this.state.weight,
        }
      })
      .then( (response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      this.toggleForm(event);

    }
    handleFormChange (event) {
      event.preventDefault();
      this.setState({[event.target.name]: event.target.value});
    }

    render () {
      var editForm =
      <form onSubmit={this.handleSubmit}>
        <div className="input-field">
          <input type="text"
          id="num_reps"
          name="num_reps"
          value={this.state.num_reps}
          onChange={this.handleFormChange}/>
          <label htmlFor="num_reps">
            Number of Reps (Per Set)
          </label>
        </div>
        <div className="input-field">
          <input type="text"
          id="num_sets"
          name="num_sets"
          value={this.state.num_sets}
          onChange={this.handleFormChange}/>
          <label htmlFor="num_sets"> Number of Sets</label>
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
      </form>;
        return (
          <div className="card">
            <div className="card-content">
              <h4 className="card-title">{this.props.exerciseData.exercise.name}</h4>
              <ul>
                <li> <b> Number of Sets: </b> {this.props.exerciseData.exercise_record.num_sets}</li>
                <li> <b> Number of Reps: </b> {this.props.exerciseData.exercise_record.num_reps}</li>
                <li> <b> Weight: </b> {this.props.exerciseData.exercise_record.weight}</li>
              </ul>
            </div>
            <div className="card-action">
            <a className="waves-effect btn-flat light-blue-text" onClick={this.toggleForm}>
              {(this.state.showEditForm)? "Hide Form":"Edit Entry"}
            </a>
            {this.state.showForm ? editForm : ""}
            </div>
          </div>
      );
    }
}
