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
        return <div>
        <h3>Exercises</h3>
        <Exercise name = "Bicep Curl"/>
        </div>
    }
}
