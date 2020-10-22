import React from 'react';
import AppMode from './../AppMode.js'; 

class ExerciseForm extends React.Component {
    constructor(props) {
        super(props);
        //Create date object for today, taking time zone into consideration
        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
        //store date as ISO string
        if (this.props.mode === AppMode.EXERCISE) {
            //If logging a new round, the starting state is a default round with
            //today's date.
            this.state = {date:  today.toISOString().substr(0,10), 
                        exercise: "",
                        sets: 0,
                        reps: 0,
                        weight: 0,
                        faIcon: "fa fa-save",
                        btnLabel: "Save Exercise Data"}
        } else {
            //if editing an existing round, the starting state is the round's
            //current data
            this.state = this.props.startData;
            this.state.faIcon = "fa fa-edit";
            this.state.btnLabel = "Update Exercise Data";
        }
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
         //Retrieve from localStorage this user's rounds and roundCount
        let thisUser = localStorage.getItem("userId");
        let data = JSON.parse(localStorage.getItem(thisUser));

        //Initialize empty JavaScript object to store new data
        let exerciseData = {}; //initalize empty object for this round

        //Store the data
        exerciseData.date = this.state.date;
        exerciseData.exercise = this.state.exercise;
        exerciseData.sets = this.state.sets;
        exerciseData.reps = this.state.reps;
        exerciseData.weight = this.state.weight;

        let count = data.exerciseDataCount;

        if (count === 0) {
            data.exerciseData[0] = exerciseData;
        } else {
            data.exerciseData[data.exerciseDataCount + 1] = exerciseData;
        }
        
        data.exerciseDataCount = count + 1;
        localStorage.setItem(thisUser,JSON.stringify(data));


        let exerciseDataData = this.state;
        delete exerciseDataData.faIcon;
        delete exerciseDataData.btnLabel;
        //call saveRound on 1 second delay to show spinning icon
        setTimeout(this.props.saveRound,1000,exerciseDataData); 

        //go back to main exercise page
        this.props.changeMode(AppMode.EXERCISES);

        //update the main page
        //this.updateExerciseDataMainPage();

        event.preventDefault(); 
        }
  
    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    // updateExerciseDataMainPage = () => {
    //     //Retrieve from localStorage this user's rounds and roundCount
    //     let thisUser = localStorage.getItem("userId");
    //     let data = JSON.parse(localStorage.getItem(thisUser));

    //     let info = data.workoutData[0];

    //     let workoutTable = document.getElementById("exerciseRecordTable");
    //     if (workoutTable.rows[1].innerHTML.includes ("colspan")) {
    //         //empty table! Need to remove this row before adding new one
    //         workoutTable.deleteRow(1);
    //     }
    //     let workoutDataRound = workoutTable.insertRow(1);

    //     workoutDataRound.innerHTML = "<td>" + info.name + "</td><td>" + 
    //     info.sets + "</td><td>" + info.reps + "</td><td>" + info.weight + "</td>";
    // }
  
    render() {
      return (
        <form className="padded-page" onSubmit={this.handleSubmit}>
          <center>
            <label>
              Date:
              <input name="date" className="form-control form-center" 
                type="date" value={this.state.date} onChange={this.handleChange}/>
            </label>
            <p></p>
            <label>
              Exercise:
              <input name="exercise" className="form-control form-center" type="text"
                 value={this.state.exercise} onChange={this.handleChange}
                placeholder="Enter workout name" size="50" maxLength="50" />
            </label>
          <p></p>
          <p></p>
          <label># of Sets:
          <input name="sets" className="form-control form-center" type="number" 
            min="0" max="50" 
            value={this.state.sets} onChange={this.handleChange}
            />
          </label>
          <p></p>
          <label># of Reps:
          <input name="reps" className="form-control form-center" type="number" 
            min="0" max="200" 
            value={this.state.reps} onChange={this.handleChange}
            />
          </label>
          <p></p>
          <label>Weight:
          <input name="weight" className="form-control form-center" type="number" 
            min="0" max="500" 
            value={this.state.weight} onChange={this.handleChange}
            />
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

export default ExerciseForm;