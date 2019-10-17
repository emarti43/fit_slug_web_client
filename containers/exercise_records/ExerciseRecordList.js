import React, {Component} from 'react';
import ExerciseRecord from './ExerciseRecord';
import RequestTemplate from '../utils/RequestTemplate';
import ListLoader from '../utils/ListLoader';

export default class ExerciseRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseRecordList: undefined,
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
      const renderRecord = list => {
        if (list === undefined) {
          return <ListLoader/>
        } else {
          if (list.length > 0)
            return(
              list.map((exercise, i) =>
                  <ExerciseRecord exerciseData = {exercise} key = {exercise.exercise_record.id} deleteElement={this.deleteElement} updateRecord={this.updateElement}/>
              )
            );
          else
            return(
              <div>
                <p>No Exercises logged in yet</p>
              </div>
            );
        }
      }
      return (
        <div>
          <h4 className="light-blue-text"> Exercises for Today </h4>
          {renderRecord(this.state.exerciseRecordList)}
        </div>
      );
    }
}
