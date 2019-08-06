import React, {Component} from 'react';
import Meal from './Meal';
import MealForm from './MealForm';

export default class MealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showMealForm: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm(event) {
      this.setState({showMealForm: !this.state.showMealForm})
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render () {
      const listElements = this.props.mealList.map((meal, i) =>
          <Meal mealData={meal} key={i}/>
      );
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
