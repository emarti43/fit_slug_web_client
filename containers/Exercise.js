import React, {Component} from 'react';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false};
        this.showForm = this.showForm.bind(this);
    }

    showForm(e) {
      e.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    render () {
      const form = <div>sample text</div>
        return <div className = "card">
        <h4>{this.props.exerciseData.name}</h4>
        <a className="waves-effect waves-light btn" onClick={this.showForm}>{(this.state.showForm)? "Hide Form":"Add Exercise"}</a>
        {(this.state.showForm)? form: <div></div>}
        </div>
    }
}
