import React, {Component} from 'react';
import ExerciseRecordForm from '../exercise_records/ExerciseRecordForm';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showForm: false,
          numSets: '',
          numReps: '',
          totalWeight: ''
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    handleDelete(event) {
      event.preventDefault();
    }

    render () {
      var exerciseRecordForm = this.state.showForm ? <ExerciseRecordForm exerciseData={this.props.exerciseData} submitRequest='post'/> : '';

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
          </div>
        </div>
      );
    }
}
