import React, {Component} from 'react';
import NutritionCard from '../NutritionCard';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showEditForm: false,
          num_servings: '',
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFormChange (event) {
      event.preventDefault();
      this.setState({ [event.target.name]: event.target.value });
    }
    toggleForm(event) {
      event.preventDefault();
      this.setState({showEditForm: !this.state.showEditForm});
    }
    handleSubmit(event) {
      event.preventDefault();
      RequestTemplate.genericRequest('put', 'meal_records/' + this.props.mealData.id,
      {
        meal_record: {
          num_servings: this.state.num_servings
        }
      })
      .then( (response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      this.toggleForm(event);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      function totals (mealData, fieldName) {
        return mealData.num_servings*mealData.meal[fieldName];
      }
      var editMealForm =
        <form onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <input type="text"
            id="num_servings"
            name="num_servings"
            value={this.state.num_servings}
            onChange={this.handleFormChange}/>
            <label htmlFor="num_servings">
            Number of Servings
            </label>
          </div>
          <input type="submit" className="waves-effect waves-light btn-flat light-blue-text" value="Submit"/>
        </form>;

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
