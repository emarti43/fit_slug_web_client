import React, {Component} from 'react';
import Exercise from './Exercise'
import ExerciseForm from './ExerciseForm';

export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseFormShow: false
        };
        this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm(event) {
      this.setState({exerciseFormShow: !this.state.exerciseFormShow})
      event.preventDefault();
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render () {
      const listElements = this.props.exerciseList.map((exercise, i) =>
          <Exercise exerciseData = {exercise.exercise} muscles = {exercise.muscles.map((muscles) => muscles.id)} key = {i}/>
      );
        return <div>
        <h3 className = "blue-text">Exercises</h3>
        <a className="waves-effect waves-teal btn-flat blue" name="exerciseFormShow"onClick={this.toggleForm}>
          { this.state.exerciseFormShow ? "Hide Form" : "Create Exercise" }
        </a>
        { this.state.exerciseFormShow ?<ExerciseForm toggleExerciseForm={this.toggleForm}/> : "" }
        {listElements}
        </div>
    }
}
