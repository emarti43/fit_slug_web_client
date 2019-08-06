import React, {Component} from 'react';
import ExerciseRecordForm from '../exercise_records/ExerciseRecordForm';
import ExerciseForm from './ExerciseForm';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showForm: false,
          showEditForm: false,
          numSets: '',
          numReps: '',
          totalWeight: ''
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleEditForm = this.toggleEditForm.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    toggleEditForm(event) {
      event.preventDefault();
      this.setState({showEditForm: !this.state.showEditForm});
    }

    handleDelete(event) {
      event.preventDefault();
    }

    render () {
      var exerciseRecordForm = this.state.showForm ? <ExerciseRecordForm exerciseData={this.props.exerciseData} submitRequest='post' toggleExerciseRecordForm={this.toggleForm}/> : '';

      var editExerciseForm = this.state.showEditForm ? <ExerciseForm exerciseData={this.props.exerciseData} submitRequest='put' toggleExerciseForm={this.toggleEditForm}/> : '';

      const listElements =
        <div className="row card-reveal">
          <div className="colcard">
            <span className="card-title grey-text text-darken-4">{this.props.exerciseData.name}<i className="material-icons right">close</i></span>
            <ul>
            {this.props.muscles.map((muscle, i) => <li key={i}> {muscle.name} </li>)}
            </ul>
          </div>
        </div>;

      return (
        <div className = "card">
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
            {this.props.exerciseData.name}<i className="right material-icons">more_vert</i>
            </span>
          </div>
          {listElements}
          <div className="card-action">
            <a className="waves-effect waves-light btn-flat light-blue-text"
              onClick={this.toggleForm}>
              {(this.state.showForm)? "Hide Form":"Add Exercise"}
            </a>
            {exerciseRecordForm}
            <a className="waves-effect waves-light btn-flat light-blue-text"
              onClick={this.toggleEditForm}>
              {(this.state.showEditForm)? "Hide Form":"Edit Exercise Info"}
            </a>
            {editExerciseForm}

          </div>
        </div>
      );
    }
}
