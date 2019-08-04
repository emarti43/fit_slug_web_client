import React, { Component } from 'react';

import MealList from './MealList';
import ExerciseList from './ExerciseList';
import ExerciseRecordList from './ExerciseRecordList';
import MealRecordList from './MealRecordList';
import ExerciseForm from './ExerciseForm';
import RequestTemplate from './RequestTemplate';

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
  fetchResources(endpoint, fieldName) {
    RequestTemplate.genericRequest('get', endpoint)
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
    this.fetchResources('meals', 'mealList');
    this.fetchResources('exercises', 'exerciseList');
    this.fetchResources('meal_records', 'mealRecordList');
    this.fetchResources('exercise_records', 'exerciseRecordList');
  }

  componentWillUnmount() {

  }
  render() {
    return (
      <div className='container'>
        <MealRecordList mealRecordList={this.state.mealRecordList}/>
        <ExerciseRecordList exerciseRecordList={this.state.exerciseRecordList}/>
        <MealList mealList={this.state.mealList}/>
        <ExerciseList exerciseList={this.state.exerciseList}/>
      </div>
    );
  }
}
export default Home;
