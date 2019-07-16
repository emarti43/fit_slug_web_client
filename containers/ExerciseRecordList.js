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
        return <div>
        <h3 className = "blue-text">Your Exercises</h3>
        {listElements}
        </div>
    }
}
