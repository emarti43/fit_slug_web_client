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

  toggleForm(event) {
    this.setState({[event.target.name]: !this.state[event.target.name]})
    event.preventDefault();
  }

  render() {
    return (
      <div className='container'>
        <div className="section">
          <MealRecordList />
          <ExerciseRecordList/>
          <MealList/>
          <ExerciseList />
        </div>
      </div>
    );
  }
}
export default Home;
