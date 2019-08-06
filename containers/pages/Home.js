import React, { Component } from 'react';

import MealList from '../meals/MealList';
import ExerciseList from '../exercises/ExerciseList';
import ExerciseRecordList from '../exercise_records/ExerciseRecordList';
import MealRecordList from '../meal_records/MealRecordList';
import RequestTemplate from '../utils/RequestTemplate';

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
        <div className="section">
          <MealRecordList mealRecordList={this.state.mealRecordList}/>
          <ExerciseRecordList exerciseRecordList={this.state.exerciseRecordList}/>
          <MealList mealList={this.state.mealList}/>
          <ExerciseList exerciseList={this.state.exerciseList}/>
        </div>
      </div>
    );
  }
}
export default Home;
