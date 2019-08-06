import React, {Component} from 'react';
import ExerciseRecord from './ExerciseRecord'

export default class ExerciseRecordList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render () {
      const listElements = this.props.exerciseRecordList.map((exercise, i) =>
          <ExerciseRecord exerciseData = {exercise} key = {i}/>
      );
        return (
          <div>
            <h5 className="light-blue-text"> Your Exercises </h5>
            {listElements}
          </div>
        );
    }
}
