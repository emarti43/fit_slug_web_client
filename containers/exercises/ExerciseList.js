import React, {Component} from 'react';
import Exercise from './Exercise';
import ExerciseForm from './ExerciseForm';
import RequestTemplate from '../utils/RequestTemplate';
import ListLoader from '../utils/ListLoader';

export default class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseFormShow: false,
          exerciseList: undefined,
        };
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.updateElement = this.updateElement.bind(this);
        this.addElement = this.addElement.bind(this);
    }

    deleteElement(id) {
      this.setState(
        {
          exerciseList: this.state.exerciseList.filter(exercise => exercise.exercise.id !== id)
        }
      );
    }

    updateElement(data) {
      this.setState({
        exerciseList: this.state.exerciseList.map(element => {
          if (data.exercise.id === element.exercise.id) return data;
          else return element;
        })
      });
    }

    addElement(exercise) {
      var appendedList = this.state.exerciseList;
      appendedList.push(exercise);
      this.setState({MealList: appendedList});
    }

    toggleForm(event) {
      this.setState({ exerciseFormShow: !this.state.exerciseFormShow });
      event.preventDefault();
    }

    componentDidMount() {
      RequestTemplate.genericRequest('get', 'exercises')
      .then( response => {
        this.setState({ exerciseList: response.data });
      })
    }

    componentWillUnmount() {

    }

    render () {
      const renderRecord = list => {
        if (list === undefined) {
          return <ListLoader/>
        } else {
          if (list.length > 0)
            return(list.map((exercise, i) =>
              <Exercise
                exerciseData={exercise.exercise}
                muscles={exercise.muscles}
                key={i}
                submitRequest='post'
                deleteElement={this.deleteElement}
                updateRecord={this.updateElement}/>
              )
            );
          else
            return(
              <div>
                <p>No Exercises available</p>
              </div>
            );
        }
      }
      return (<div>
      <h4 className = "light-blue-text">Select an Exercise</h4>
      {renderRecord(this.state.exerciseList)}
      <div>
        <a className="waves-effect waves-teal btn light-blue white-text" name="exerciseFormShow"onClick={this.toggleForm}>
          { this.state.exerciseFormShow ? "Hide Form" : "Create Exercise" }
        </a>
      </div>
      { this.state.exerciseFormShow ?<ExerciseForm toggleExerciseForm={this.toggleForm} submitRequest= 'post' addElement={this.addElement}/> : "" }
      </div>);
    }
}
