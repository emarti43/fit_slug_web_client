import React, {Component} from 'react';
export default class Meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false};
        this.showForm = this.showForm.bind(this);
    }

    showForm(e) {
      e.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      const form = <div>sample text</div>
      const mealItem = <div className = "card">
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
      <a className="waves-effect waves-light btn" onClick={this.showForm}>{(this.state.showForm)? "Hide Form":"Add Meal"}</a>
      {(this.state.showForm)? form: <div></div>}
      </div>;
      return mealItem;
    }
}
