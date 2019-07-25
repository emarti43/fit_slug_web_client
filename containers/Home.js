import React, { Component } from 'react';

import MealList from './MealList';
import ExerciseList from './ExerciseList';
import ExerciseRecordList from './ExerciseRecordList';
import MealRecordList from './MealRecordList';

const axios = require('axios');

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        mealList: [],
        exerciseList: [],
        exerciseRecordList: [],
        mealRecordList: [],
        isLoggedin: false,
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

  getExerciseRecords() {
    axios.get('http://127.0.0.1:3000/api/exercise_records.json', {headers: {
      'Authorization' : localStorage.getItem('fit_slug_session')}
    })
    .then((response) => {
      this.setState({exerciseRecordList: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getMealRecords() {
    axios.get('http://127.0.0.1:3000/api/meal_records.json', {headers: {
      'Authorization' : localStorage.getItem('fit_slug_session')}
    })
    .then((response) => {
      this.setState({mealRecordList: response.data});
    })
    .catch((error) => {
      console.log(error);
    });
  }
  componentDidMount() {
    this.getMealList();
    this.getExerciseList();
    this.getExerciseRecords();
    this.getMealRecords();
  }

  componentWillUnmount() {

  }
  render() {
    return (
      <div>
      <MealRecordList mealRecordList={this.state.mealRecordList}/>
      <ExerciseRecordList exerciseRecordList={this.state.exerciseRecordList}/>
      <MealList mealList={this.state.mealList}/>
      <ExerciseList exerciseList={this.state.exerciseList}/>
      </div>
    );
  }
}
export default Home;
