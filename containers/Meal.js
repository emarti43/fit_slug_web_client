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
        return <div className = "card">
        <h4>{this.props.mealData.name}</h4>
        <ul>
          <li> Amount Per {this.props.mealData.serving_size}</li>
          <li> Calories {this.props.mealData.kcal} </li>
          <li> Total Fat {this.props.mealData.total_fat} g</li>
          <li> Saturated Fat {this.props.mealData.sat_fat}g</li>
          <li> Monounsaturated Fat {this.props.mealData.monoun_fat} g</li>
          <li> Cholesterol {this.props.mealData.cholesterol} g</li>
          <li> Sodium {this.props.mealData.sodium} g</li>
          <li> Potassium {this.props.mealData.potassium} g</li>
          <li> Total Carbohydrate {this.props.mealData.total_carb} g</li>
          <li> Dietary fiber {this.props.mealData.fiber} g</li>
          <li> Sugar {this.props.mealData.sugar} g</li>
          <li> Protein {this.props.mealData.protein} g</li>
        </ul>
        </div>
    }
}
