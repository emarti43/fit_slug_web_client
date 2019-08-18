import React, {Component} from 'react';
import ExerciseRecordForm from '../exercise_records/ExerciseRecordForm';
import ExerciseForm from './ExerciseForm';
import RequestTemplate from '../utils/RequestTemplate';

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
      RequestTemplate.genericRequest('delete', 'exercises/' + this.props.exerciseData.id)
      .then( (response) => {
        console.log(response);
        this.props.deleteElement(this.props.exerciseData.id);
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    render () {
      var exerciseRecordForm = this.state.showForm ? <ExerciseRecordForm exerciseData={this.props.exerciseData} submitRequest='post' toggleExerciseRecordForm={this.toggleForm}/> : '';

      var editExerciseForm = this.state.showEditForm ? <ExerciseForm exerciseData={this.props.exerciseData}
      submitRequest='put'
      toggleExerciseForm={this.toggleEditForm}
      updateRecord={this.props.updateRecord}/> : '';

      const listElements =
        <div className="col s6">
          <div className="colcard">
              <b> Muscles Used</b>
            <ul>
            {this.props.muscles.map((muscle, i) => <li key={i}> {muscle.name} </li>)}
            </ul>
          </div>
        </div>;

      return (
        <div className = "card">
          <div className="card-content">
            <div className="row">
              <div className="col s6">
                <span className="card-title activator grey-text text-darken-4">
                  {this.props.exerciseData.name}
                </span>
                {listElements}
              </div>
            </div>
          </div>
          <div className="card-action">
            <a className="waves-effect waves-light btn-flat light-blue-text"
              onClick={this.toggleForm}>
              {(this.state.showForm)? "Hide Form":"Log Exercise"}
            </a>

            <a className="waves-effect waves-light btn-flat light-blue-text"
              onClick={this.toggleEditForm}>
              {(this.state.showEditForm)? "Hide Form":"Edit Exercise Info"}
            </a>

            <a className="waves-effect waves-light btn-flat red-text"
              onClick={this.handleDelete}>
              Delete Exercise
            </a>
            {exerciseRecordForm}
            {editExerciseForm}
          </div>
        </div>
      );
    }
}
