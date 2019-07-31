import React, {Component} from 'react';
export default class NutritionCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{this.props.mealData.name}<i className="material-icons right">close</i></span>
          <ul>
            <li> <b>Amount Per</b> {this.props.mealData.serving_size}</li>
            <li> <b>Calories</b> {this.props.mealData.kcal} </li>
            <li> <b>Total Fat</b> {this.props.mealData.total_fat} g</li>
            <li> <b>Saturated Fat</b> {this.props.mealData.sat_fat} g</li>
            <li> <b>Monounsaturated Fat</b> {this.props.mealData.monoun_fat} g</li>
            <li> <b>Cholesterol</b> {this.props.mealData.cholesterol} g</li>
            <li> <b>Sodium</b> {this.props.mealData.sodium} g</li>
            <li> <b>Potassium</b> {this.props.mealData.potassium} g</li>
            <li> <b>Total Carbohydrate</b> {this.props.mealData.total_carb} g</li>
            <li>    Dietary fiber {this.props.mealData.fiber} g</li>
            <li>    Sugar {this.props.mealData.sugar} g</li>
            <li> <b>Protein</b> {this.props.mealData.protein} g</li>
          </ul>
      </div>
    );
  }
}
