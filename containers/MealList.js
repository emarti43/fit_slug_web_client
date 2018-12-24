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
      const listElements = this.props.mealList.map((meal, i) =>
          <Meal mealData={meal} key={i}/>
      );
        return <div className="row">
        <h3 className = "green-text">Meal List</h3>
        {listElements}
        </div>
    }
}
