import React, {Component} from 'react';
export default class NutritionCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row card-reveal">
          <div className="colcard">
          <span class="card-title grey-text text-darken-4">{this.props.mealData.name}<i class="material-icons right">close</i></span>
            <ul>
              <li> <b>Amount Per</b> {this.props.mealData.serving_size}</li>
              <div class="divider"></div>
              <li> <b>Calories</b> {this.props.mealData.kcal} </li>
              <div class="divider"></div>
              <li> <b>Total Fat</b> {this.props.mealData.total_fat} g</li>
              <div class="divider"></div>
              <li> <b>Saturated Fat</b> {this.props.mealData.sat_fat} g</li>
              <div class="divider"></div>
              <li> <b>Monounsaturated Fat</b> {this.props.mealData.monoun_fat} g</li>
              <div class="divider"></div>
              <li> <b>Cholesterol</b> {this.props.mealData.cholesterol} g</li>
              <div class="divider"></div>
              <li> <b>Sodium</b> {this.props.mealData.sodium} g</li>
              <div class="divider"></div>
              <li> <b>Potassium</b> {this.props.mealData.potassium} g</li>
              <div class="divider"></div>
              <li> <b>Total Carbohydrate</b> {this.props.mealData.total_carb} g</li>
              <li>    Dietary fiber {this.props.mealData.fiber} g</li>
              <li>    Sugar {this.props.mealData.sugar} g</li>
              <div class="divider"></div>
              <li> <b>Protein</b> {this.props.mealData.protein} g</li>
              <div class="divider"></div>
            </ul>
          </div>
      </div>
    );
  }
}
