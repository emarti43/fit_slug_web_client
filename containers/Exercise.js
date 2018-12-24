import React, {Component} from 'react';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return <div className = "card">
        <h4>{this.props.exerciseData.name}</h4>
        </div>
    }
}
