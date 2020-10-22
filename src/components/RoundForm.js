import React from 'react';
import AppMode from './../AppMode.js';

class RoundForm extends React.Component {
    constructor(props) {
        super(props);
        //Create date object for today, taking time zone into consideration
        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
        //store date as ISO string
        if (this.props.mode === AppMode.ROUNDS_LOGROUND) {
            //If logging a new round, the starting state is a default round with
            //today's date.
            this.state = {date:  today.toISOString().substr(0,10), 
                        course: "",
                        score: "80",
                        notes: "",
                        faIcon: "fa fa-save",
                        btnLabel: "Save Class Data"}
        } else {
            //if editing an existing round, the starting state is the round's
            //current data
            this.state = this.props.startData;
            this.state.faIcon = "fa fa-edit";
            this.state.btnLabel = "Update Round Data";
        }
    }
  
  
    handleChange = (event) => {
        const name = event.target.name;
          this.setState({[name]: event.target.value});
    }
  
  
    //handleSubmit -- When the user clicks on the button to save/update the
    //round, start the spinner and invoke the parent component's saveRound
    //method to do the actual work. Note that saveRound is set to the correct
    //parent method based on whether the user is logging a new round or editing
    //an existing round.
    handleSubmit = (event) => {
        //start spinner
        this.setState({faIcon: "fa fa-spin fa-spinner",
                        btnLabel: (this.props.mode === AppMode.ROUNDS_LOGROUND ? 
                                    "Saving..." : "Updating...")});
        //Prepare current round data to be saved
        let roundData = this.state;
        delete roundData.faIcon;
        delete roundData.btnLabel;
        //call saveRound on 1 second delay to show spinning icon
        setTimeout(this.props.saveRound,1000,roundData); 
        event.preventDefault(); 
        }
  
  
    render() {
      return (
        <form className="padded-page" onSubmit={this.handleSubmit}>
          <center>
            <label>
              Date:
              <input name="date" className="form-control form-center" 
                type="date" value={this.state.date} onChange={this.handleChange} />
            </label>
            <p></p>
            <label>
              Course:
              <input name="course" className="form-control form-center" type="text"
                value={this.state.course} onChange={this.handleChange}
                placeholder="Course played" size="50" maxLength="50" />
            </label>
          <p></p>
          <label>Score:
          <input name="score" size="3" type="number"
            min="0" max="100"
            value={this.state.score}
            onChange={this.handleChange} />  
          </label>
          <p></p>
          <label>Notes:
              <textarea name="notes" className="form-control" rows="6" cols="75" 
                placeholder="Enter round notes" value={this.state.notes} 
                onChange={this.handleChange} />
          </label>
          <p></p>
          <p></p>
          <button type="submit" style={{width: "70%",fontSize: "36px"}} 
            className="btn btn-primary btn-color-theme">
              <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
          </button>
          </center>
        </form>
      );
    }
}

export default RoundForm;