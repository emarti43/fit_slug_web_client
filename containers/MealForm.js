import React, {Component} from 'react';
import RequestTemplate from './RequestTemplate';

export default class MealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleSubmit(event) {
    console.log(this.state);
    var params = this.state;
    RequestTemplate.genericRequest('post', 'meals', params)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    this.props.toggleMealForm();
    event.preventDefault();
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
        <label htmlFor={key}>{key}</label>
          <input type="text" id={key} name={key} className="filled-in" onChange={this.handleFormChange}/>
      </div>
    )}</div>;

    return (
      <div className="card">
        <span className="card-title">Create Exercise</span>
        <form onSubmit={this.handleSubmit}>
          {listOfFields}
          <input type="submit" className="waves-effect waves-teal btn-flat blue" value="Submit"/>
        </form>
      </div>
    );
  }
}
