import React, {Component} from 'react';
import MealList from './MealList';
import ExerciseList from './ExerciseList';
const axios = require('axios');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mealList: [],
          exerciseList: []
        }
    }
    getMealList() {
      axios.get('http://127.0.0.1:3000/api/meals.json')
      .then((response) => {
        this.setState({mealList: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
    }

    getExerciseList() {
      axios.get('http://127.0.0.1:3000/api/exercises.json')
      .then((response) => {
        this.setState({exerciseList: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
    }
    componentDidMount() {
      this.getMealList();
      this.getExerciseList();
    }

    componentWillUnmount() {

    }

    render () {
          return <div>
          <MealList mealList={this.state.mealList}/>
          <ExerciseList exerciseList={this.state.exerciseList}/>
          </div>
    }
}
