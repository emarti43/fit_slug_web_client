import React, {Component} from 'react';
import Exercise from './Exercise'

export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.listElements = props.list.map((name) =>
            <Exercise name = {name}/>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render () {
        return <div>
        <h3>Exercises</h3>
        {this.listElements}
        </div>
    }
}
