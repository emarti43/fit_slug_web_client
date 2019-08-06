import React, {Component} from 'react';
import NutritionCard from '../NutritionCard';
import RequestTemplate from '../utils/RequestTemplate';
import MealRecordForm from '../meal_records/MealRecordForm';

export default class Meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showForm: false,
        };
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      var form = <MealRecordForm mealData={this.props.mealData} submitRequest='post'/>

      var mealItem =
      <div className="card sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{this.props.mealData.name}<i className="material-icons right">more_vert</i></span>
        </div>
        <NutritionCard mealData={this.props.mealData}/>
        <div className="card-action">
          <a className="waves-effect waves-teal btn-flat light-blue-text" onClick={this.toggleForm}>
            {(this.state.showForm)? "Hide Form":"Add Meal"}
          </a>
          {(this.state.showForm)? form: <div></div>}
        </div>

      </div>;
      return mealItem;
    }
}
