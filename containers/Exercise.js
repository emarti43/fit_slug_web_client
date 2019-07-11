import React, {Component} from 'react';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false, numSets: '', numReps: '', totalWeight: ''};
        this.toggleForm = this.toggleForm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log('An exercise record was submitted: ' + [this.state.numSets, this.state.numReps, this.state.totalWeight].toString());
      this.toggleForm(event)
    }

    handleFormChange(event) {
      const target = event.target;
      const value = target.value;
      const name  = target.name;
      this.setState({[name]: value});
    }

    render () {
      var form = <div>
        <form onSubmit={this.handleSubmit}>
          <label>
          Number of Sets:
          <input type="text" name="numSets" value={this.state.numSets} onChange={this.handleFormChange}/>
          Number of Reps Per Set:
          <input type="text" name="numReps" value={this.state.numReps} onChange={this.handleFormChange}/>
          Weight (per rep):
          <input type="text" name="totalWeight" value={this.state.totalWeight} onChange={this.handleFormChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
        return (<div className = "card">
        <h4>{this.props.exerciseData.name}</h4>
        <a className="waves-effect waves-light btn" onClick={this.toggleForm}>{(this.state.showForm)? "Hide Form":"Add Exercise"}</a>
        {(this.state.showForm)? form: <div></div>}
        </div>
      );
    }
}
