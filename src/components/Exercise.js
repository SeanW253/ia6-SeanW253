/* eslint-disable default-case */
//Rounds -- A parent component for the app's "rounds" mode.
//Manages the rounds data for the current user and conditionally renders the
//appropriate rounds mode page based on App's mode, which is passed in as a prop.

import React from 'react';
import AppMode from './../AppMode.js';
import FloatingButton from './FloatingButton.js';
import ExerciseForm from './ExerciseForm.js';
import ExerciseTable from './ExerciseTable';

class Exercises extends React.Component {

    //Initialize a Rounds object based on local storage
    constructor(props) {
            super(props);
            let data = JSON.parse(localStorage.getItem(this.props.userId)); 
            if (data == null) { //no data yet for this user -- create empty record
                data = {exerciseData: {},
                        exerciseDataCount: 0};  
                localStorage.setItem(this.props.userId,JSON.stringify(data));
            }
            this.state = {exercise: data.exerciseData,
                          exerciseCount: data.exerciseDataCount,
                          deleteId: "",
                          editId: ""};           
        }

    //addRound -- Given an object newData containing a new round, add the round
    //to the current user's list of rounds, incremeting roundCount to ensure
    //the round id is unique. Then commit to local storage and toggle
    //the mode back to AppMode.ROUNDS since the user is done adding a round.
    addRound = (newData) => {
        let data = JSON.parse(localStorage.getItem(this.props.userId));
        data.exercise[++data.exerciseCount] = newData;
        localStorage.setItem(this.props.userId, JSON.stringify(data));
        this.setState({exercise: data.exercise, exerciseCount: data.exerciseCount});
        this.props.changeMode(AppMode.EXERCISES);
    }

        //editRound -- Given an object newData containing updated data on an
    //existing round, update the current user's round uniquely identified by
    //this.state.editId, commit to local storage, reset editId to empty and
    //toggle the mode back to AppMode.ROUNDS since the user is done editing the
    //round. 
    editRound = (newData) => {
        let data = JSON.parse(localStorage.getItem(this.props.userId)); 
        data.exerciseData[this.state.editId] = newData;
        localStorage.setItem(this.props.userId, JSON.stringify(data));
        this.setState({exercises: data.exerciseData, editId: ""});
        this.props.changeMode(AppMode.EXERCISES);
    }

    // //deleteRound -- Delete the current user's round uniquely identified by
    // //this.state.deleteId, commit to local storage, and reset deleteId to empty.
    // deleteRound = () => {
    //     let data = JSON.parse(localStorage.getItem(this.props.userId));
    //     delete data.rounds[this.state.deleteId];
    //     localStorage.setItem(this.props.userId,JSON.stringify(data));
    //     this.setState({rounds: data.rounds, deleteId: ""});
    // }  

    // //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    // //the user is considering deleting.
    // setDeleteId = (val) => {
    //     this.setState({deleteId: val});
    // }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.setState({editId: val});
    }
   
    //render -- Conditionally render the Rounds mode page as either the rounds
    //table, the rounds form set to obtain a new round, or the rounds form set
    //to edit an existing round.
    render() {
        switch(this.props.mode) {
            case AppMode.ROUNDS:
                return (
                    <>
                    <ExerciseTable 
                    exercises={this.state.exercise}
                    setEditId={this.setEditId}
                    setDeleteId={this.setDeleteId}
                    deleteRound={this.deleteRound}
                    changeMode={this.props.changeMode}
                    menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        handleClick={() => 
                        this.props.changeMode(AppMode.ROUNDS_LOGROUND)}
                        menuOpen={this.props.menuOpen}
                        icon={"fa fa-plus"} />
                    </>
                );
            case AppMode.ROUNDS_LOGROUND:
                return (
                    <ExerciseForm
                        mode={this.props.mode}
                        startData={""} 
                        saveRound={this.addRound} />
                );
            case AppMode.ROUNDS_EDITROUND:
                return (
                    <ExerciseForm
                        mode={this.props.mode}
                        changeMode={this.props.changeMode}
                        startData={this.state.exercise[this.state.editId]} 
                        saveRound={this.editRound} />
                );
        }
    }

}   

export default Exercises;
