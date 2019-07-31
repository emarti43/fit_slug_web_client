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
      function totals (mealData, fieldName) {
        return mealData.num_servings*mealData.meal[fieldName];
      }
      var mealItem = <div className = "card">
      <h4 className="card-title">{this.props.mealData.meal.name}</h4>

      <div className="card-content">
         <span className="card-title activator grey-text text-darken-4">{this.props.mealData.name}<i className=" right btn-flat">Nutritional Info</i></span>
         <b>Number of servings</b> {this.props.mealData.num_servings}
         <ul>
          <li><b>Calories:</b> {totals(this.props.mealData, 'kcal')}</li>
          <li><b>Protein:</b> {totals(this.props.mealData, 'protein')}</li>
          <li><b>Fat:</b> {totals(this.props.mealData, 'total_fat')}</li>
          <li><b>Carbs:</b> {totals(this.props.mealData, 'total_carb')}</li>
         </ul>
      </div>

      <NutritionCard mealData = {this.props.mealData.meal}/>
      </div>;
      return mealItem;
    }
}
