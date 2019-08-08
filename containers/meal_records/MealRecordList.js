import React, {Component} from 'react';
import MealRecord from './MealRecord'

export default class MealRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mealRecordList: [],
        }
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(props, state) {
      if (props.mealRecordList.length !== state.mealRecordList.length) {
        return {
          mealRecordList: props.mealRecordList
        }
      }
      return null
    }

    componentWillUnmount() {

    }

    render () {
      var listElements = '';
      if (this.state.mealRecordList) {
         listElements = this.state.mealRecordList.map((meal, i) =>
            <MealRecord mealData={meal} key={i}/>
        );
      }

      function totals (fieldName) {
        return (sum, mealRecord) => mealRecord.num_servings*mealRecord.meal[fieldName] + sum;
      }
      const totalCalories = this.props.mealRecordList.reduce(totals('kcal'), 0);
      const totalProtein = this.props.mealRecordList.reduce(totals('protein'), 0);
      const totalFat = this.props.mealRecordList.reduce(totals('total_fat'), 0);
      const totalCarbs = this.props.mealRecordList.reduce(totals('total_carb'), 0);
        return(
        <div className="row ">
          <div>
            <h5 className="light-blue-text"> Macro Totals </h5>
            <ul>
              <li><b>Calories:</b> {totalCalories}</li>
              <li><b>Protein:</b> {totalProtein} g</li>
              <li><b>Fat:</b> {totalFat} g</li>
              <li><b>Carbs:</b> {totalCarbs} g</li>
            </ul>
          </div>
          <h5 className="light-blue-text" >Your Meals</h5>
          {listElements}
        </div>);
    }
}
