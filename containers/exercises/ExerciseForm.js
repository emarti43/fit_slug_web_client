import React, {Component} from 'react';
import RequestTemplate from '../utils/RequestTemplate';

export default class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muscles: [],
      exerciseName: '',
      unsuccessfulSubmit: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    if (event.target.type === 'checkbox') {
      let selected = this.state[event.target.id];

      this.setState({[event.target.id]: !selected});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
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
      console.log(response);
      if (response.status === 200) {
        params.exercise.muscles = params.exercise.muscles.map(id => this.state.muscles.find(muscle => muscle.id === id));
        params.exercise.id = this.props.exerciseData.id;
        this.props.updateRecord(params);
      } 
      if (response.data === 201) {
        this.props.addElement(response.data);
      }
      this.props.toggleExerciseForm(event);
    }).catch( function (error) {
      console.log(error);
      this.setState({unsuccessfulSubmit: true});
    })
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
      <div className="col s6" key={i}>
          <label htmlFor={muscle.id}>
            <input type="checkbox" id={muscle.id} className="filled-in" onChange={this.handleFormChange}/>
            <span>{muscle.name}</span>
          </label>
      </div>);
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            Exercise
          </span>
          <form onSubmit={this.handleSubmit}>
            {this.state.unsuccessfulSubmit ? <a className="red-text"> Unsuccessful Submit. Please try again</a>: ''}
            <div className="input-field col s12">
              <label htmlFor="exerciseName">Name of Exercise</label>
              <input type="text" name="exerciseName" value={this.state.name} onChange={this.handleFormChange}></input>
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
