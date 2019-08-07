import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';
import ExerciseFormMuscles from './ExerciseFormMuscles';

export default class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muscles: [],
      exerciseName: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    if (event.target.type == 'checkbox') {
      this.setState({[event.target.id]: !this.state[event.target.id]});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
    event.preventDefault();
  }

  handleSubmit(event) {
    var selectedMuscles = [];
    for(var i = 1; i <= this.state.muscles.length; i++) {
      if(this.state[i]){
        selectedMuscles.push(i);
      };
    }
    var params = {
      exercise: {
        name: this.state.exerciseName,
        muscles: selectedMuscles,
      }
    }
    if (this.props.submitRequest == 'put') {
      var endpoint = 'exercises/' + this.props.exerciseData.id;
    } else {
      var endpoint = 'exercises';
    }
    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) =>{
      console.log(response)
    }).catch( function (error) {
      console.log(error);
    })
    event.preventDefault();
    this.props.toggleExerciseForm(event);
  }

  componentDidMount() {
    RequestTemplate.genericRequest('get','muscles')
    .then((response) => {
      this.setState({
        muscles: response.data.map((muscle) => muscle)
      });
      for(var i = 1; i <= this.state.muscles.length; i++) {
        this.setState({[i]: false});
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const muscleCheckboxes = this.state.muscles.map((muscle, i) =>
    <ExerciseFormMuscles key={i} muscle={muscle} handleFormChange={this.handleFormChange}/>);
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            Exercise
          </span>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <label htmlFor="exerciseName">Name of Exercise</label>
              <input type="text" name="exerciseName"value={this.state.name} onChange={this.handleFormChange}></input>
            </div>
            <span>Muscles Used:</span>
            <div className="row">{muscleCheckboxes}</div>
            <input type="submit" className="waves-effect waves-teal btn-flat light-blue-text" value="Submit"/>
          </form>
        </div>
      </div>
    );
  }
}
