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
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
      event.preventDefault();
      RequestTemplate.genericRequest('delete', 'meal_records/' + this.props.mealData.id)
      .then( (response) => {
        console.log(response);
        this.props.deleteElement(this.props.mealData.id);
      })
      .catch( (error) => {
        console.log(error);
      });
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

      var editMealForm =<MealRecordForm mealData={this.props.mealData} submitRequest='put' toggleMealRecordForm={this.toggleForm} updateRecord={this.props.updateRecord}/>;

      var mealItem =
      <div className = "card">
        <div className="card-content">
           <div className="row">
             <NutritionCard mealData = {this.props.mealData.meal}/>
             <div className="col s6">
               <span className="card-title activator grey-text text-darken-4">
               Logging Info
               </span>
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
           </div>
        </div>

        <div className="card-action">
          <a className="waves-effect btn-flat light-blue-text" onClick={this.toggleForm}>
            {(this.state.showEditForm)? "Hide":<i className="large material-icons">edit</i>}
          </a>
          <a className="waves-effect waves-light btn-flat red-text"
            onClick={this.handleDelete}>
            <i className="large material-icons">delete</i>
          </a>
          {(this.state.showEditForm)? editMealForm: ''}
        </div>
      </div>;
      return mealItem;
    }
}
