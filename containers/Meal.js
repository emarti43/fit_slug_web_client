import React, {Component} from 'react';

export default class Meal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
        return <div>
        <h4>{this.props.mealData.name}</h4>
        <ul>
          <li> Serving Size: {this.props.mealData.serving_size}</li>
          <li> Calories: {this.props.mealData.kcal} </li>
          <li> Total Fat: {this.props.mealData.total_fat} g</li>
        </ul>
        </div>
    }
}
