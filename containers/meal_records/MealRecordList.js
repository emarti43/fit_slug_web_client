import React, {Component} from 'react';
import MealRecord from './MealRecord';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mealRecordList: [],
        }
        this.deleteElement = this.deleteElement.bind(this);
    }

    deleteElement(id){
      this.setState(
        {
          mealRecordList: this.state.mealRecordList.filter(record => record.id !== id)
        }
      );
    }
    
    componentDidMount() {
      RequestTemplate.genericRequest('get', 'meal_records')
      .then( response => {
        this.setState({mealRecordList: response.data});
      }).catch(error => {
        console.log(error)
      })
    }

    render () {
      var listElements = '';
      if (this.state.mealRecordList) {
         listElements = this.state.mealRecordList.map((meal, i) =>
            <MealRecord mealData={meal} key={i} deleteElement={this.deleteElement}/>
        );
      }

      function totals (fieldName) {
        return (sum, mealRecord) => mealRecord.num_servings*mealRecord.meal[fieldName] + sum;
      }
      const totalCalories = this.state.mealRecordList.reduce(totals('kcal'), 0);
      const totalProtein = this.state.mealRecordList.reduce(totals('protein'), 0);
      const totalFat = this.state.mealRecordList.reduce(totals('total_fat'), 0);
      const totalCarbs = this.state.mealRecordList.reduce(totals('total_carb'), 0);
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
