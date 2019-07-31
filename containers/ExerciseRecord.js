import React, {Component} from 'react';
import axios from 'axios';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (<div className = "card">
        <h4 class="card-title">{this.props.exerciseData.exercise_name}</h4>
        <ul>
          <li> <b> Number of Sets: </b> {this.props.exerciseData.exercise_record.num_sets}</li>
          <li> <b> Number of Reps: </b> {this.props.exerciseData.exercise_record.num_reps}</li>
          <li> <b> Weight: </b> {this.props.exerciseData.exercise_record.weight}</li>
        </ul>
        </div>
      );
    }
}
