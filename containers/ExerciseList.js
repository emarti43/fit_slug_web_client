import React, {Component} from 'react';
import Exercise from './Exercise'

export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render () {
      const listElements = this.props.exerciseList.map((exercise, i) =>
          <Exercise exerciseData = {exercise} key = {i}/>
      );
        return <div>
        <h3 className = "blue-text">Exercises</h3>
        {listElements}
        </div>
    }
}
