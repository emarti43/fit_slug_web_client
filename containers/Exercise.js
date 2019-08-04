import React, {Component} from 'react';
import RequestTemplate from './RequestTemplate';

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showForm: false, numSets: '', numReps: '', totalWeight: ''};
        this.toggleForm = this.toggleForm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleForm(event) {
      event.preventDefault();
      this.setState({showForm: !this.state.showForm});
    }
    handleDelete(event) {

      event.preventDefault();
    }

    handleSubmit(event) {
      event.preventDefault();
      RequestTemplate.genericRequest('post', 'exercise_records',
      {
        exercise_record:
        {
          exercise_id: this.props.exerciseData.id,
          num_sets: this.state.numSets,
          num_reps: this.state.numReps,
          weight: this.state.totalWeight,
        }});
      this.toggleForm(event);
    }

    handleFormChange(event) {
      const target = event.target;
      const value = target.value;
      const name  = target.name;
      this.setState({[name]: value});
    }

    render () {

      var form =
        <form onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <label for="numSets"> Number of Sets:</label>
            <input type="text" id="numSets" name="numSets" className="validate" value={this.state.numSets} onChange={this.handleFormChange}/>
          </div>
          <div className="input-field col s12">
            <label for="numReps"> Number of Reps Per Set:</label>
            <input type="text" id="numReps" name="numReps" value={this.state.numReps} onChange={this.handleFormChange}/>
          </div>
          <div className="input-field col s12">
            <label for="totalWeight"> Weight (per rep): </label>
            <input type="text" id="totalWeight" name="totalWeight" value={this.state.totalWeight} onChange={this.handleFormChange}/>
          </div>
          <input type="submit" className="waves-effect waves-light btn blue" value="Submit"/>
        </form>


        return (
          <div className = "card">
          <btn className="btn-floating btn-large waves-effect waves-light red right"><i className="right material-icons">clear</i></btn>
            <div className="card-image waves-effect waves-block waves-light">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
              {this.props.exerciseData.name}<i className="right btn-flat">Exercise Info</i>
              </span>

            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn-flat"
                onClick={this.toggleForm}>{(this.state.showForm)? "Hide Form":"Add Exercise"}
              </a>
              {(this.state.showForm)? form: <div></div>}
            </div>
          </div>
      );
    }
}
