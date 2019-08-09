import React, {Component} from 'react';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import RequestTemplate from '../utils/RequestTemplate';

export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseFormShow: false,
          exerciseList: [],
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
    }

    deleteElement(id) {
      this.setState(
        {
          exerciseList: this.state.exerciseList.filter(exercise => exercise.exercise.id !== id)
        }
      );
    }

    toggleForm(event) {
      this.setState({ exerciseFormShow: !this.state.exerciseFormShow })
      event.preventDefault();
    }

    componentDidMount() {
      RequestTemplate.genericRequest('get', 'exercises')
      .then( response => {
        console.log(response);
        this.setState({ exerciseList: response.data });
      })
    }

    componentWillUnmount() {

    }

    render () {
      var listElements = ''
      if (this.state.exerciseList) {
        listElements = this.state.exerciseList.map((exercise, i) =>
            <Exercise exerciseData={exercise.exercise} muscles = {exercise.muscles} key={i} submitRequest='post' deleteElement= {this.deleteElement}/>
        );
      }
      return (<div>
      <h5 className = "light-blue-text">Exercises</h5>
      {listElements}
      <a className="waves-effect waves-teal btn light-blue white-text" name="exerciseFormShow"onClick={this.toggleForm}>
        { this.state.exerciseFormShow ? "Hide Form" : "Create Exercise" }
      </a>
      { this.state.exerciseFormShow ?<ExerciseForm toggleExerciseForm={this.toggleForm} submitRequest= 'post'/> : "" }
      </div>);
    }
}
