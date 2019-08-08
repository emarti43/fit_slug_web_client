import React, {Component} from 'react';
import Exercise from './Exercise'
import ExerciseForm from './ExerciseForm';

export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseFormShow: false,
          exerciseList: [],
        };
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(event) {
      this.setState({exerciseFormShow: !this.state.exerciseFormShow})
      event.preventDefault();
    }
    static getDerivedStateFromProps(props, state) {
      if (props.exerciseList.length !== state.exerciseList.length) {
        return {
          exerciseList: props.exerciseList
        }
      }
      return null
    }

    componentDidMount() {
      this.setState({exerciseList: this.props.exerciseList});
    }

    componentWillUnmount() {

    }

    render () {
      var listElements = ''
      if (this.state.exerciseList) {
        listElements = this.state.exerciseList.map((exercise, i) =>
            <Exercise exerciseData={exercise.exercise} muscles = {exercise.muscles} key={i} submitRequest='post'/>
        );
      }
      return (<div>
      <h5 className = "light-blue-text">Exercises</h5>
      {listElements}
      <a className="waves-effect waves-teal btn light-blue-text white" name="exerciseFormShow"onClick={this.toggleForm}>
        { this.state.exerciseFormShow ? "Hide Form" : "Create Exercise" }
      </a>
      { this.state.exerciseFormShow ?<ExerciseForm toggleExerciseForm={this.toggleForm} submitRequest= 'post'/> : "" }
      </div>);
    }
}
