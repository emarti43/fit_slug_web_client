import React, {Component} from 'react';
import MealRecord from './MealRecord';
import RequestTemplate from '../utils/RequestTemplate';
import ListLoader from '../utils/ListLoader';

export default class MealRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mealRecordList: undefined,
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
      const renderRecords = list => {
        if (list === undefined) {
          return <ListLoader/>
        } else {
          if (list.length > 0)
            return this.state.mealRecordList.map((meal, i) =>
               <MealRecord mealData={meal}
                 key={i}
                 deleteElement={this.deleteElement}
                 updateRecord={this.updateElement}/>
           );
          else
            return <div> <p>No Meals logged in yet</p> </div>;
        }
      }
      var listElements = renderRecords(this.state.mealRecordList);

      function totals (fieldName) {
        return (sum, mealRecord) => mealRecord.num_servings*mealRecord.meal[fieldName] + sum;
      }
      let totalCalories = 0;
      let totalProtein = 0;
      let totalFat = 0;
      let totalCarbs = 0;
      if (this.state.mealRecordList) {
        totalCalories = this.state.mealRecordList.reduce(totals('kcal'), 0);
        totalProtein = this.state.mealRecordList.reduce(totals('protein'), 0);
        totalFat = this.state.mealRecordList.reduce(totals('total_fat'), 0);
        totalCarbs = this.state.mealRecordList.reduce(totals('total_carb'), 0);
      }
      return(
      <div className="row ">
        <h4 className="light-blue-text">Meals for Today</h4>
        <div className="row flow-text">
          <div className="totals col s3"><h5>{totalCalories}</h5> <b>Calories</b></div>
          <div className="totals brown-text protein col s3"><h5> {totalProtein} g </h5> <b>Protein</b></div>
          <div className="totals yellow-text text-darken-2 col s3"><h5> {totalFat} g </h5><b>Fat</b></div>
          <div className="totals green-text col s3"><h5> {totalCarbs} g </h5> <b>Carbs</b></div>
        </div>
        {listElements}
      </div>);
    }
}
