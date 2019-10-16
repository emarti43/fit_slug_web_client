import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealRecordForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      numServings: '',
      unsuccessfulSubmit: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let endpoint = `meal_records/${this.props.submitRequest === 'put' ? this.props.mealData.id : ''}`;
    let params =  {
      meal_record: {
        num_servings: this.state.numServings
      }
    }
    if (this.props.submitRequest === 'post') params = { meal_record: { ...params.meal_record, meal_id: this.props.mealData.id }};
    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) => {
      if (response.status === 200) {
        params.id = this.props.mealData.id;
        this.props.updateRecord(params);
      }
      this.props.toggleMealRecordForm(event);
    })
    .catch((error) => {
      console.log(error);
      this.setState({unsuccessfulSubmit: true});
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
          {this.state.unsuccessfulSubmit ? <a className="red-text"> Unsuccessful Submit. Please try again</a>: ''}
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
