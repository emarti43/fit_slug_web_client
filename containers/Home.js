import React, { Component } from 'react';

import MealList from './MealList';
import ExerciseList from './ExerciseList';
import ExerciseRecordList from './ExerciseRecordList';
import MealRecordList from './MealRecordList';
import ExerciseForm from './ExerciseForm';

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
        exerciseFormShow: false,
      }
      this.toggleForm = this.toggleForm.bind(this);
  }
  genericRequestTemplate(endpoint, fieldName) {
    axios.get('http://127.0.0.1:3000/api/' + endpoint, {
      headers: { 'Authorization': localStorage.getItem('fit_slug_session')}
    })
    .then((response) => {
      this.setState({[fieldName]: response.data});
    })
    .catch((error) => {
      console.log(error);
    })
  }
  toggleForm(event) {
    this.setState({[event.target.name]: !this.state[event.target.name]})
    event.preventDefault();
  }

  componentDidMount() {
    this.genericRequestTemplate('meals', 'mealList');
    this.genericRequestTemplate('exercises', 'exerciseList');
    this.genericRequestTemplate('meal_records', 'mealRecordList');
    this.genericRequestTemplate('exercise_records', 'exerciseRecordList');
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
