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
        this.updateElement = this.updateElement.bind(this);
        this.addElement = this.addElement.bind(this);
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

    addElement(meal) {
      var appendedList = this.state.mealList;
      appendedList.push(meal);
      this.setState({MealList: appendedList});
    }

    updateElement(data) {
      this.setState({mealList: this.state.mealList.map(element => {
        if (element.id === data.id) {
          return data;
        } else {
          return element;
        }
      })});
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
      if (this.state.mealList && this.state.mealList.length > 0) {
        listElements =  this.state.mealList.map((meal, i) =>
            <Meal mealData={meal} key={i} updateRecord={this.updateElement}/>
        );
      } else {
        listElements = <div>
          <p>No Exercises logged in yet</p>
        </div>
      }
        return <div className="row">
        <h4 className = "light-blue-text"> Select a Meal </h4>
        {listElements}
        <a className="waves-effect waves-teal btn light-blue white-text" name="exerciseFormShow"onClick={this.toggleForm}>
          { this.state.showMealForm ? "Hide Form" : "Create Meal" }
        </a>
        { this.state.showMealForm ?
          <MealForm toggleMealForm={this.toggleForm} submitRequest='post' addElement={this.addElement}/>
          : "" }
        </div>
    }
}
