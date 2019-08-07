import React, {Component} from 'react';
import NutritionCard from '../NutritionCard';
import RequestTemplate from '../utils/RequestTemplate';
import MealRecordForm from '../meal_records/MealRecordForm';
import MealForm from './MealForm'

export default class Meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showForm: false,
          showEditForm: false,
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleEditForm = this.toggleEditForm.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
      event.preventDefault();
      RequestTemplate.genericRequest('delete', 'meals/' + this.props.mealData.id)
      .then( (response) => {
        console.log(response);
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }
    toggleEditForm(event) {
      event.preventDefault();
      this.setState({showEditForm: !this.state.showEditForm});
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      var mealRecordForm = <MealRecordForm mealData={this.props.mealData} submitRequest='post' toggleMealRecordForm={this.toggleForm}/>
      var mealEditForm = <MealForm mealData={this.props.mealData} submitRequest='put' toggleMealForm={this.toggleEditForm}/>
      var mealItem =
      <div className="card sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
        </div>
        <div className="card-content">
          <div className="row">
          <NutritionCard mealData={this.props.mealData}/>
          </div>
        </div>
        <div className="card-action">
          <a className="waves-effect waves-teal btn-flat light-blue-text" onClick={this.toggleForm}>
            {(this.state.showForm) ? "Hide Form":"Add Meal"}
          </a>
          <a className="waves-effect waves-teal btn-flat light-blue-text" onClick={this.toggleEditForm}>
            {(this.state.showEditForm) ? "Hide Form": "Edit Nutritional Info"}
          </a>
          <a className="waves-effect waves-light btn-flat red-text"
            onClick={this.handleDelete}>
            Delete Meal
          </a>
          {(this.state.showForm) ? mealRecordForm: ''}
          {(this.state.showEditForm) ? mealEditForm: ''}
        </div>

      </div>;
      return mealItem;
    }
}
