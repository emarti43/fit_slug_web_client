import React, {Component} from 'react';
import Meal from './Meal';
import MealForm from './MealForm';
import RequestTemplate from '../utils/RequestTemplate';
import ListLoader from '../utils/ListLoader';

export default class MealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showMealForm: false,
          mealList: undefined
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

      const renderRecord = list => {
        if (list ===undefined) {
          return <ListLoader/>
        } else {
          if (list.length > 0)
            return(list.map((meal, i) =>
                <Meal mealData={meal} key={i} updateRecord={this.updateElement} deleteElement={this.deleteElement}/>
              )
            );
          else
            return(
              <div>
                <p>No Meals available</p>
              </div>
            );
        }
      }
      return <div className="row">
      <h4 className = "light-blue-text"> Select a Meal </h4>
      {renderRecord(this.state.mealList)}
      <a className="waves-effect waves-teal btn light-blue white-text" name="exerciseFormShow"onClick={this.toggleForm}>
        { this.state.showMealForm ? "Hide Form" : "Create Meal" }
      </a>
      { this.state.showMealForm ?
        <MealForm toggleMealForm={this.toggleForm} submitRequest='post' addElement={this.addElement}/>
        : "" }
      </div>
    }
}
