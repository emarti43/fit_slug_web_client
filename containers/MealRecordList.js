import React, {Component} from 'react';
import MealRecord from './MealRecord'

export default class MealRecordList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render () {
      const listElements = this.props.mealRecordList.map((meal, i) =>
          <MealRecord mealData={meal} key={i}/>
      );
        return <div className="row">
        <h3 className = "green-text">Your Meals</h3>
        {listElements}
        </div>
    }
}
