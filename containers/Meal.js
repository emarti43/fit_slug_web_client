import React, {Component} from 'react';

export default class Meal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    render () {
        return <div>
        <h4>{this.props.name}</h4>
        </div>
    }
}
