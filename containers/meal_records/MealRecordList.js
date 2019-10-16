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
        this.updateElement = this.updateElement.bind(this);
    }

    deleteElement(id){
      console.log('record is deleted');
      this.setState(
        {
          mealRecordList: this.state.mealRecordList.filter(record => record.id !== id)
        }
      );
    }

    updateElement(data) {
      this.setState({mealRecordList: this.state.mealRecordList.map(element => {
        if (element.id === data.id) {
          return({
            num_servings: data.meal_record.num_servings,
            id: element.id,
            meal: element.meal,
            user_id: element.user_id,
          });
        } else {
          return element;
        }
      })});
    }

    componentDidMount() {
      RequestTemplate.genericRequest('get', 'recent_meals')
      .then( response => {
        this.setState({mealRecordList: response.data});
      }).catch(error => {
        console.log(error)
      })
    }

    render () {
      var listElements = '';
      if (this.state.mealRecordList || this.state.mealRecordList.length > 0) {
         listElements = this.state.mealRecordList.map((meal, i) =>
            <MealRecord mealData={meal} key={i} deleteElement={this.deleteElement} updateRecord={this.updateElement}/>
        );
      } else {
        listElements =
        <div>
          <p>No Meals logged in yet</p>
        </div>
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
          <h4 className="light-blue-text">Meals for Today</h4>
          <div className="row">
            <div className="totals col s3"><h5>{totalCalories} <b>Calories</b></h5></div>
            <div className="totals  brown-text protein col s3"><h5> {totalProtein} g <b>Protein</b></h5> </div>
            <div className="totals yellow-text text-darken-2 col s3"><h5> {totalFat} g <b>Fat</b></h5></div>
            <div className="totals green-text col s3"><h5> {totalCarbs} g <b>Carbs</b></h5></div>
          </div>
          {listElements}
        </div>);
    }
}
