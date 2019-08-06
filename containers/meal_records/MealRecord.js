import React, {Component} from 'react';
import NutritionCard from '../NutritionCard';
import RequestTemplate from '../utils/RequestTemplate';
import MealRecordForm from './MealRecordForm';

export default class MealRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showEditForm: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showEditForm: !this.state.showEditForm});
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      function totals (mealData, fieldName) {
        return mealData.num_servings*mealData.meal[fieldName];
      }

      var editMealForm =<MealRecordForm mealData={this.props.mealData} submitRequest='put'/>;

      var mealItem =
      <div className = "card">
        <div className="card-content">
          <h4 className="card-title">{this.props.mealData.meal.name}</h4>
           <span className="card-title activator grey-text text-darken-4">{this.props.mealData.name}<i className="material-icons right">more_vert</i></span>
           <b>Number of servings</b> {this.props.mealData.num_servings}
           <ul>
            <li>
              <b>Calories:</b> {totals(this.props.mealData, 'kcal')}
            </li>
            <li>
              <b>Protein:</b> {totals(this.props.mealData, 'protein')}
            </li>
            <li>
              <b>Fat:</b> {totals(this.props.mealData, 'total_fat')}
            </li>
            <li>
              <b>Carbs:</b> {totals(this.props.mealData, 'total_carb')}
            </li>
           </ul>
        </div>
        <NutritionCard mealData = {this.props.mealData.meal}/>
        <div className="card-action">
          <a className="waves-effect btn-flat light-blue-text" onClick={this.toggleForm}>
            {(this.state.showEditForm)? "Hide Form":"Edit Entry"}
          </a>
          {(this.state.showEditForm)? editMealForm: ''}
        </div>
      </div>;
      return mealItem;
    }
}
