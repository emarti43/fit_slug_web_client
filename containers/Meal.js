import React, {Component} from 'react';
import NutritionCard from './NutritionCard';
import RequestTemplate from './RequestTemplate';

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
      RequestTemplate.genericRequest('post', 'meal_records',
      {
        meal_record:
        {
          meal_id: this.props.mealData.id,
          num_servings: this.state.numServingsForm
        }
      });
      this.toggleForm(event);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
      var form =
        <form onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <label for="servings"> Number of Servings: </label>
            <input type="text" id="servings" value={this.state.numServingsForm} onChange={this.handleFormChange}/>
          </div>
          <input type="submit" className="waves-effect waves-teal btn-flat " value="Submit"/>
        </form>

      var mealItem =
      <div className="card sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"/>
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{this.props.mealData.name}<i className="material-icons right">more_vert</i></span>
        </div>
        <NutritionCard mealData={this.props.mealData}/>
        <div className="card-action">
          <a className="waves-effect waves-teal btn-flat" onClick={this.toggleForm}>
            {(this.state.showForm)? "Hide Form":"Add Meal"}
          </a>
          {(this.state.showForm)? form: <div></div>}
        </div>

      </div>;
      return mealItem;
    }
}
