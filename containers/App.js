import React, {Component} from 'react';
import MealList from './MealList';
import ExerciseList from './ExerciseList';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render () {
        return <div>
        This is my new react app
        <MealList list={["Chicken Tikki Masala", "Sticky Rice", "Lentils"]}/>
        <ExerciseList list={["Bicep Curl", "Push Ups", "Bench Press"]}/>
        </div>
    }
}
