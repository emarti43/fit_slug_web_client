import React, {Component} from 'react';
import Meal from './Meal'

export default class MealList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    
    render () {
        return <div>
        <h3>Meal List</h3>
        <Meal name = "chicken"/>
        </div>
    }
}
