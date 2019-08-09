import React, {Component} from 'react';
import Meal from './Meal';
import MealForm from './MealForm';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showMealForm: false,
          mealList: []
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
    }
    toggleForm(event) {
      this.setState({showMealForm: !this.state.showMealForm})
    }
    deleteElement(id) {
      this.setState(
        {
          mealList: this.state.mealList.filter(record => record.id !== id)
        }
      );
    }

    componentDidMount() {
      RequestTemplate.genericRequest('get', 'meals')
      .then(response => {
        this.setState({mealList: response.data});
      }).catch(errror => {
        console.log(error);
      })
    }


    render () {
      var listElements = '';
      if (this.state.mealList) {
        listElements =  this.state.mealList.map((meal, i) =>
            <Meal mealData={meal} key={i}/>
        );
      }
        return <div className="row">
        <h5 className = "light-blue-text">Meal List</h5>
        {listElements}
        <a className="waves-effect waves-teal btn light-blue white-text" name="exerciseFormShow"onClick={this.toggleForm}>
          { this.state.showMealForm ? "Hide Form" : "Create Meal" }
        </a>
        { this.state.showMealForm ?
          <MealForm toggleMealForm={this.toggleForm} submitRequest='post'/>
          : "" }
        </div>
    }
}
