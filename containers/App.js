import React, {Component} from 'react';
import MealList from './MealList';
import ExerciseList from './ExerciseList';
const axios = require('axios');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
      axios.get('http://127.0.0.1/meals.json')
      .then(function (response) {
        console.log(response);
      });
      .catch(function (error) {
        console.log(error);
      });
    }

    componentWillUnmount() {

    }

    render () {
        return <div>
        This is my new react app
        <MealList list={["Chicken Tikki Masala", "Sticky Rice"]}/>
        <ExerciseList list={["Bicep Curl", "Push Ups", "Bench Press"]}/>
        </div>
    }
}
