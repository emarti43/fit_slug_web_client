import React, {Component} from 'react';
import ExerciseRecord from './ExerciseRecord';
import RequestTemplate from '../utils/RequestTemplate';

export default class ExerciseRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseRecordList: [],
        }
        this.deleteElement = this.deleteElement.bind(this);
        this.updateElement = this.updateElement.bind(this);
    }

    deleteElement(id) { 
      this.setState(
        {
          exerciseRecordList: this.state.exerciseRecordList.filter(record => record.exercise_record.id !== id)
        }
      );
    }

    updateElement(data) {
      var temp = this.state.exerciseRecordList.map(element => {
        if (data.exercise_record.id === element.exercise_record.id) {
          return ({
            exercise_record: data.exercise_record,
            exercise: element.exercise,
            muscles: element.muscles,
          });
        } else {
          return element;
        }
      });
      this.setState({exerciseRecordList: temp});
    }

    componentDidMount() {
      RequestTemplate.genericRequest('get', 'recent_exercises')
      .then(response => {
        this.setState({exerciseRecordList: response.data});
      })
      .catch(error => {
        console.log(error);
      })
    }


    render () {
      var listElements = '';
      if (this.state.exerciseRecordList || this.state.exerciseRecordList.length > 0) {
        listElements =  this.state.exerciseRecordList.map((exercise, i) =>
            <ExerciseRecord exerciseData = {exercise} key = {exercise.exercise_record.id} deleteElement={this.deleteElement} updateRecord={this.updateElement}/>
        );
      } else {
        listElements = <div>
          <p>No Exercises logged in yet</p>
        </div>
      }
      return (
        <div>
          <h4 className="light-blue-text"> Exercises for Today </h4>
          {listElements}
        </div>
      );
    }
}
