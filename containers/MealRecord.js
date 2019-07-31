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
      <h4 class="card-title">{this.props.mealData.meal.name}</h4>
      <ul>
      <li><b>Number of servings</b> {this.props.mealData.num_servings}</li>
      </ul>

      <NutritionCard mealData = {this.props.mealData.meal}/>
      </div>;
      return mealItem;
    }
}
