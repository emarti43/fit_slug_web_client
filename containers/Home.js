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
  genericRequestTemplate(endpoint, fieldName) {
    axios.get('http://127.0.0.:3000/api/' + endpoint, {
      headers: { 'Authorization': localStorage.getItem('fit_slug_session')}
    })
    .then((response) => {
      this.setState({[fieldName]: response.data});
    })
    .catch((error) => {
      console.log(error);
    })
  }
  componentDidMount() {
    this.genericRequestTemplate('meals.json', 'mealList');
    this.genericRequestTemplate('exercises.json', 'exerciseList');
    this.genericRequestTemplate('meal_records.json', 'mealRecordList');
    this.genericRequestTemplate('exercise_records.json', 'exerciseRecordList');
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
