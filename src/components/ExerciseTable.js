import React from 'react';
import AppMode from './../AppMode.js';

class ExerciseTable extends React.Component {

  //editRound -- Triggered when the user clicks the edit button for a given
  //round. The id param is the unique property that identifies the round.
  //Set the state variable representing the id of the round to be edited and
  //then switch to the ROUNDS_EDITROUND mode to allow the user to edit the
  //chosen round.
  editRound = (id) => {
    this.props.setEditId(id);
    this.props.changeMode(AppMode.ROUNDS_EDITROUND);
  }

  //confirmDelete -- Triggered when the user clicks the delete button
  //for a given round. The id paam is the unique property that 
  //identifies the round. Set the state variable representing the id
  //of the round to be deleted and then present a dialog box asking
  //the user to confirm the deletion.
  //TO DO: Implement the confirmation dialog box. For now, we
  //present alert box placeholder
  confirmDelete = (id) => {
    this.props.setDeleteId(id);
    alert("Are you sure you want to delete?");
  }


//   renderTable -- render an HTML table displaying the rounds logged
//   by the current user and providing buttons to view/edit and delete each round.
  renderTable = () => {
  let table = [];
  for (const r in this.props.exercises) {
    table.push(
      <tr key={r}>
        <td>{this.props.exercises[r].date}</td>
        <td>{this.props.exercises[r].exercise}</td>
        <td>{this.props.exercises[r].sets}</td>
        <td>{this.props.exercises[r].reps}</td>
        <td>{this.props.exercises[r].weight}</td>
        <td><button onClick={this.props.menuOpen ? null : () => 
          this.editRound(r)}>
              <span className="fa fa-eye"></span></button></td>
        <td><button onClick={this.props.menuOpen ? null : 
          () => this.confirmDelete(r)}>
              <span className="fa fa-trash"></span></button></td>
      </tr> 
    );
  }
  return table;
  }

  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return(
    <div className="padded-page">
      <h1></h1>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Workout</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>View/Edit...</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.exercises).length === 0 ? 
          <tr>
          <td colSpan="7" style={{fontStyle: "italic"}}>No Exercise Data found</td>
          </tr> 
           : this.renderTable() }
        </tbody>
      </table>
    </div>
    );
  }
}

export default ExerciseTable;
