import React, {Component} from 'react';
import NutritionCard from './NutritionCard';

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
      this.toggleForm(event);
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
          <input type="submit" className="waves-effect waves-light btn blue" value="Submit"/>
        </form>
      </div>

      var mealItem = <div className = "card">
      <h5>{this.props.mealData.name}</h5>
      <NutritionCard mealData={this.props.mealData}/>
      <a className="waves-effect waves-light btn blue" onClick={this.toggleForm}>
        {(this.state.showForm)? "Hide Form":"Add Meal"}
      </a>
      {(this.state.showForm)? form: <div></div>}
      </div>;
      return mealItem;
    }
}
