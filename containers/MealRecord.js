import React, {Component} from 'react';

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
      <h4>{this.props.mealData.meal_id}</h4>
      <ul>
        <li> <b>Number of servings</b> {this.props.mealData.num_servings}</li>
      </ul>
      </div>;
      return mealItem;
    }
}
