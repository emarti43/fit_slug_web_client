import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';
import ExerciseRecordForm from './ExerciseRecordForm';

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
    }
    
    toggleForm (event) {
      event.preventDefault();
      this.setState( { showForm: !this.state.showForm } );
    }

    render () {
      var editForm = <ExerciseRecordForm exerciseData={this.props.exerciseData} submitRequest='put'/>;
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
