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
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleForm (event) {
      event.preventDefault();
      this.setState( { showForm: !this.state.showForm } );
    }

    handleDelete (event) {
      event.preventDefault();
      RequestTemplate.genericRequest('delete', 'exercise_records/' + this.props.exerciseData.exercise_record.id)
      .then( (response) => {
        console.log(response);
        this.props.deleteElement(this.props.exerciseData.exercise_record.id);
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    render () {
      var musclesUsed =
      <div className="col s6">
            <b> Muscles Used</b>
          <ul>
          {this.props.exerciseData.muscles.map((muscle, i) => <li key={i}> {muscle.name} </li>)}
          </ul>
      </div>;
      var editForm = <ExerciseRecordForm exerciseData={this.props.exerciseData} submitRequest='put' toggleExerciseRecordForm= {this.toggleForm}/>;
        return (
          <div className="card">
            <div className="card-content">
              <div className="row">
                <div className="col s6">
                  <h4 className="card-title">{this.props.exerciseData.exercise.name}</h4>
                  <ul>
                    <li> <b> Number of Sets: </b> {this.props.exerciseData.exercise_record.num_sets}</li>
                    <li> <b> Number of Reps: </b> {this.props.exerciseData.exercise_record.num_reps}</li>
                    <li> <b> Weight: </b> {this.props.exerciseData.exercise_record.weight}</li>
                  </ul>
                </div>
                {musclesUsed}
              </div>
            </div>
            <div className="card-action">
              <a className="waves-effect btn-flat light-blue-text" onClick={this.toggleForm}>
                {(this.state.showEditForm)? "Hide Form":"Edit Entry"}
              </a>
              {this.state.showForm ? editForm : ""}
              <a className="waves-effect btn-flat red-text" onClick={this.handleDelete}>
                Delete Record
              </a>
            </div>
          </div>
      );
    }
}
