import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class MealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      unsuccessfulSubmit: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleSubmit(event) {
    var params = {
      meal: this.state.values
    };
    var endpoint = 'meals';
    if (this.props.submitRequest == 'put') {
      endpoint = 'meals/' + this.props.mealData.id;
    }
    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) => {
      if (response.status == 200) {
        params.meal.id = this.props.mealData.id;
        this.props.updateRecord(params.meal);
      } else {
        this.props.addElement(params.meal);
      }
      this.props.toggleMealForm(event);
    }).catch((error) => {
      console.log(error);
      this.setState({unsuccessfulSubmit: true});
    });
    event.preventDefault();
  }

  handleFormChange(event) {
    var modifiedValues = this.state.values;
    modifiedValues[event.target.name] = event.target.value;
    this.setState({values: modifiedValues});
    event.preventDefault();
  }
  componentDidMount () {
    let currentComponent = this;
    RequestTemplate.genericRequest('get', 'meals_fields')
    .then((response) => {
      var fetchedFields = {};
       response.data.forEach(function(element) {
         fetchedFields[element] = '';
       });
       this.setState({values: fetchedFields});
    }).catch((error) =>{
      console.log(error);
    });
  }
  render () {
    var listOfFields = <div className="row">{Object.keys(this.state.values).map((key, i) =>
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
            {this.state.unsuccessfulSubmit ? <a className="red-text"> Unsuccessful Submit. Please try again</a>: ''}
            {listOfFields}
            <input type="submit" className="waves-effect waves-teal btn-flat light-blue-text" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}
