import React, {Component} from 'react';
import NutritionCard from './NutritionCard';
export default class MealRecord extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      var mealItem = <div className = "card">
      <h4>{this.props.mealData.meal.name}</h4>
      <ul>
      <li><b>Number of servings</b> {this.props.mealData.num_servings}</li>
      </ul>
      <h5> Totals </h5>
      <NutritionCard mealData = {this.props.mealData.meal}/>
      </div>;
      return mealItem;
    }
}
