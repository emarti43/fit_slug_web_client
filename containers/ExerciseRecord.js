import React, {Component} from 'react';
import axios from 'axios';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (<div className = "card">
        <h4>{this.props.exerciseData.exercise_id}</h4>
        <ul>
          <li> <b> Number of Sets: </b> {this.props.exerciseData.num_sets}</li>
          <li> <b> Number of Reps: </b> {this.props.exerciseData.num_reps}</li>
          <li> <b> Weight: </b> {this.props.exerciseData.weight}</li>
        </ul>
        </div>
      );
    }
}
