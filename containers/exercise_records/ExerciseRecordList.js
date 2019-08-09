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
    }

    deleteElement(id) {
      this.setState(
        {
          exerciseRecordList: this.state.exerciseRecordList.filter(record => record.exercise_record.id !== id)
        }
      );
    }

    componentDidMount() {
      RequestTemplate.genericRequest('get', 'exercise_records')
      .then(response => {
        console.log(response);
        this.setState({exerciseRecordList: response.data});
      })
      .catch(error => {
        console.log(error);
      })
    }


    render () {
      var listElements = '';
      if (this.state.exerciseRecordList) {
        listElements =  this.state.exerciseRecordList.map((exercise, i) =>
            <ExerciseRecord exerciseData = {exercise} key = {exercise.exercise_record.id} deleteElement={this.deleteElement}/>
        );
      }
      return (
        <div>
          <h5 className="light-blue-text"> Your Exercises </h5>
          {listElements}
        </div>
      );
    }
}
