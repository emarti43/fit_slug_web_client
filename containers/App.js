import React, {Component} from 'react';
import MealList from './MealList';
import ExerciseList from './ExerciseList';
import $ from 'jquery';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $.ajax({
            url: 'http://127.0.0.1:3000/meals.json',
            type: 'get',
            success: function (response) {
                // handle the response
                console.log(response);
            },
            error: function (xhr, status) {
                console.log('couldn\'t');
            },
            dataType: 'html'
        });
    }

    componentWillUnmount() {

    }

    render () {
        return <div>
        This is my new react app
        <MealList list={["Chicken Tikki Masala", "Sticky Rice"]}/>
        <ExerciseList list={["Bicep Curl", "Push Ups", "Bench Press"]}/>
        </div>
    }
}
