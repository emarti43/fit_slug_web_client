import React, {Component} from 'react';
import MealRecord from './MealRecord'

export default class MealRecordList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render () {
      const listElements = this.props.mealRecordList.map((meal, i) =>
          <MealRecord mealData={meal} key={i}/>
      );
      function totals (fieldName) {
        return (sum, mealRecord) => mealRecord.num_servings*mealRecord.meal[fieldName] + sum;
      }
      const totalCalories = this.props.mealRecordList.reduce(totals('kcal'), 0);
      const totalProtein = this.props.mealRecordList.reduce(totals('protein'), 0);
      const totalFat = this.props.mealRecordList.reduce(totals('total_fat'), 0);
      const totalCarbs = this.props.mealRecordList.reduce(totals('total_carb'), 0);
        return(
        <div className="row">
          <h3 className="blue-text">Your Meals</h3>
          <div className="card">
            <h5 className="card-title"> Totals </h5>
            <ul>
              <li><b>Calories:</b> {totalCalories}</li>
              <li><b>Protein:</b> {totalProtein}</li>
              <li><b>Fat:</b> {totalFat}</li>
              <li><b>Carbs:</b> {totalCarbs}</li>
            </ul>
          </div>
          {listElements}
        </div>);
    }
}
