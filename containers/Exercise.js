import React, {Component} from 'react';
import RequestTemplate from './RequestTemplate';

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
          <input type="submit" className="waves-effect waves-light btn blue" value="Submit"/>
        </form>
      </div>


        return (
          <div className = "card medium">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"/>
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">{this.props.exerciseData.name}<i class="material-icons right">more_vert</i></span>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn-flat" onClick={this.toggleForm}>{(this.state.showForm)? "Hide Form":"Add Exercise"}</a>
              {(this.state.showForm)? form: <div></div>}
            </div>
          </div>
      );
    }
}
