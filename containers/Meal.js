import React, {Component} from 'react';

export default class Meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false, numServingsForm: ''};
        this.toggleForm = this.toggleForm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    handleFormChange(event) {
      event.preventDefault();
      this.setState({numServingsForm: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log('A meal record was submitted: ' + this.state.numServingsForm);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      var form = <div>
        <form onSubmit={this.handleSubmit}>
          <label>
          Number of Servings:
          <input type="text" value={this.state.numServingsForm} onChange={this.handleFormChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>

      var mealItem = <div className = "card">
      <h4>{this.props.mealData.name}</h4>
      <ul>
        <li> <b>Amount Per</b> {this.props.mealData.serving_size}</li>
        <li> <b>Calories</b> {this.props.mealData.kcal} </li>
        <li> <b>Total Fat</b> {this.props.mealData.total_fat} g</li>
        <li> <b>Saturated Fat</b> {this.props.mealData.sat_fat} g</li>
        <li> <b>Monounsaturated Fat</b> {this.props.mealData.monoun_fat} g</li>
        <li> <b>Cholesterol</b> {this.props.mealData.cholesterol} g</li>
        <li> <b>Sodium</b> {this.props.mealData.sodium} g</li>
        <li> <b>Potassium</b> {this.props.mealData.potassium} g</li>
        <li> <b>Total Carbohydrate</b> {this.props.mealData.total_carb} g</li>
        <li>    Dietary fiber {this.props.mealData.fiber} g</li>
        <li>    Sugar {this.props.mealData.sugar} g</li>
        <li> <b>Protein</b> {this.props.mealData.protein} g</li>
      </ul>
      <a className="waves-effect waves-light btn" onClick={this.toggleForm}>
        {(this.state.showForm)? "Hide Form":"Add Meal"}
      </a>
      {(this.state.showForm)? form: <div></div>}
      </div>;
      return mealItem;
    }
}
