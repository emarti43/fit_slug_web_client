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
      let newMuscleState = {
        [event.target.id]: {
          ...this.state.muscles[event.target.id], selected: !this.state.muscles[event.target.id].selected
        }
      }
      this.setState( (prevState, props) => { return {
        ...prevState, muscles: {
          ...prevState.muscles, ...newMuscleState
        }
      }
    });
  } else { // only for Name change
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var selectedMuscles = Object.keys(this.state.muscles).filter( id => this.state.muscles[id].selected);
    var params = {
      exercise: {
        name: this.state.exerciseName,
        muscles: selectedMuscles,
      }
    }
    if (this.props.submitRequest === 'put') {
      var endpoint = 'exercises/' + this.props.exerciseData.id;
    } else {
      var endpoint = 'exercises';
    }
    RequestTemplate.genericRequest(this.props.submitRequest, endpoint, params)
    .then((response) =>{
      if (response.status === 200) {
        this.props.updateRecord(response.data);
      }
      if (response.status === 201) {
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
      let muscleStates = {}
      for(var i = 0; i < response.data.length; i++) {
        let index = response.data[i].id;
        muscleStates[index] = {...response.data[i], selected: false}
      };
      this.setState({ muscles: muscleStates });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const muscleCheckboxes = Object.keys(this.state.muscles).map(id =>
      <div className="col s6" key={id}>
          <label htmlFor={id}>
            <input type="checkbox" id={id} className="filled-in" onChange={this.handleFormChange}/>
            <span>{this.state.muscles[id].name}</span>
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
