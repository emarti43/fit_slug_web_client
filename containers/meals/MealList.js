import React, {Component} from 'react';
import Meal from './Meal';
import MealForm from './MealForm';

export default class MealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showMealForm: false,
          mealList: []
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm(event) {
      this.setState({showMealForm: !this.state.showMealForm})
    }
    static getDerivedStateFromProps(props, state) {
      if (props.mealList.length !== state.mealList.length) {
        return {
          mealList: props.mealList
        }
      }
      return null
    }

    componentDidMount() {
      this.setState({showMealForm: this.props.mealList});
    }

    componentWillUnmount() {

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
        <a className="waves-effect waves-teal btn-flat light-blue" name="exerciseFormShow"onClick={this.toggleForm}>
          { this.state.showMealForm ? "Hide Form" : "Create Meal" }
        </a>
        { this.state.showMealForm ?<MealForm toggleMealForm={this.toggleForm} submitRequest='post'/> : "" }
        </div>
    }
}
