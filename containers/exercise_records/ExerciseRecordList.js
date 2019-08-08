import React, {Component} from 'react';
import ExerciseRecord from './ExerciseRecord'

export default class ExerciseRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseRecordList: [],
        }
    }

    componentDidMount() {
      this.setState({exerciseRecordList: this.props.exerciseRecordList});
    }
    static getDerivedStateFromProps(props, state) {
      if (props.exerciseRecordList.length !== state.exerciseRecordList.length) {
        return {
          exerciseRecordList: props.exerciseRecordList
        }
      }
      return null
    }

    componentWillUnmount() {

    }

    render () {
      var listElements = '';
      if (this.state.exerciseRecordList) {
        const listElements =  this.state.exerciseRecordList.map((exercise, i) =>
            <ExerciseRecord exerciseData = {exercise} key = {i}/>
        );
      }
      return (
        <div>
          <h5 className="light-blue-text"> Your Exercises </h5>
          {listElements}
        </div>
      );
    }
}
