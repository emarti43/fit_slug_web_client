import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealRecordForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      numServings: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.submitRequest == 'put') {
      var endpoint = 'meal_records/' + this.props.mealData.id;
      var params = {
        meal_record: {
          num_servings: this.state.numServings,
        }
      };
    } else {
      var endpoint = 'meal_records/';
      var params = {
        meal_record: {
          num_servings: this.state.numServings,
          meal_id: this.props.mealData.id,
        }
      };
    }
    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        params.id = this.props.mealData.id;
        this.props.updateRecord(params);
      }
      this.props.toggleMealRecordForm(event);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleFormChange(event) {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-field col s12">
          <input type="text"
          id="numServings"
          name="numServings"
          value={this.state.numServings}
          onChange={this.handleFormChange}/>
          <label htmlFor="numServings">
          Number of Servings
          </label>
        </div>
        <input type="submit" className="waves-effect waves-light btn-flat light-blue-text" value="Submit"/>
      </form>
    );

  }
}
