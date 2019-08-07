import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleSubmit(event) {
    var params = {
      meal: this.state
    };
    var endpoint = 'meals';
    if (this.props.submitRequest == 'put') {
      endpoint = 'meals/' + this.props.mealData.id;
    }
    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    event.preventDefault();
    this.props.toggleMealForm(event);
  }
  handleFormChange(event) {
    this.setState({[event.target.name]: event.target.value})
    event.preventDefault();
  }
  componentDidMount () {
    let currentComponent = this;
    RequestTemplate.genericRequest('get', 'meals_fields')
    .then((response) => {
       response.data.forEach(function(element) {
         currentComponent.setState({[element]: ''});
       });
    }).catch((error) =>{
      console.log(error);
    });
  }
  render () {
    var listOfFields = <div className="row">{Object.keys(this.state).map((key, i) =>
      <div key={i} className="input-field col s6">
        <label htmlFor={key}>{key.split("_").join(" ")}</label>
          <input type="text" id={key} name={key} className="filled-in" onChange={this.handleFormChange}/>
      </div>
    )}</div>;

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Meal</span>
          <form onSubmit={this.handleSubmit}>
            {listOfFields}
            <input type="submit" className="waves-effect waves-teal btn-flat light-blue-text" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}
