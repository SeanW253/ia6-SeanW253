import React from 'react'
import ResetPasswordDialog3 from './ResetPasswordDialog3.js';

class ResetPasswordDialog2 extends React.Component {
    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.newUserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        this.state = {accountName: "",
                      displayName: "",
                      profilePicDataURL: "",
                      profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
                      accountPassword: "",
                      accountPasswordRepeat: "",
                      accountSecurityQuestion: "",
                      accountSecurityAnswer: "",
                      showResetPasswordDialog3: false};

    }

    //checkAccountValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We need to check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    checkAccountValidity = () => {
        // if (this.state.accountPassword != this.state.accountPasswordRepeat) {
        //     //Passwords don't match
        //     this.repeatPassRef.current.setCustomValidity(
        //     "This password must match original password.");
        // } else {
        //     this.repeatPassRef.current.setCustomValidity("");
        // }
        let data = JSON.parse(localStorage.getItem(this.newUserRef.current.value));
        if (data != null) {
            //The user name is already taken
            this.newUserRef.current.setCustomValidity("Account found"); //take to next dialog box
        } else {
            this.newUserRef.current.setCustomValidity("");
        }
    }

    //handleNewAccountChange--Called when a field in a dialog box form changes.
    handleNewAccountChange = (event) => {
        this.setState({[event.target.name]: event.target.value});//,this.checkAccountValidity);
    } 

    //validate security question
    validateSecurityQuestion = () => {
        let correctAns = this.props.accountSecurityAnswer;
        let userAns = this.state.accountSecurityAnswer;

        if (userAns == correctAns) {
            this.setState({showResetPasswordDialog3: true});

            //this.props.cancelDialog2();
        }
    }

    //handleDialog1 - after the first dialog box, user finishes entering username, take to
    //the next dialog
    handleDialog2 = (event) => {
        event.preventDefault();

        this.validateSecurityQuestion();

    }

    cancelDialog3 = () => {
        this.setState({showResetPasswordDialog3: false})
    }

    render() {
    return (
    <div className="modal" role="dialog">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <center>
            <h3 className="modal-title"><b>Enter answer for security question</b></h3>
            </center>
            <button className="close" 
                onClick={this.props.cancelDialog2}>
                &times;</button>
            </div>
            <div className="modal-body">
            <form onSubmit={this.handleDialog2}>
            
            <label className="securityQuestion">
                {this.props.accountSecurityQuestion}
                {/* <textarea
                className="form-control form-text form-center"
                name="accountSecurityQuestion"
                size="35"
                placeholder="Security Question"
                rows="2"
                cols="35"
                maxLength="100"
                required={true}
                value={this.securityQuestion}
                onChange={this.handleNewAccountChange} */}
            </label>
            <br/>
            <label>
                Enter security answer:
                <textarea
                className="form-control form-text form-center"
                name="accountSecurityAnswer"
                type="text"
                placeholder="Answer"
                rows="2"
                cols="35"
                maxLength="100"
                required={true}
                value={this.state.accountSecurityAnswer}
                onChange={this.handleNewAccountChange}
                />
            </label>
            <br/>

            <button role="submit"
                className="btn btn-primary btn-color-theme modal-submit-btn">
                <span className="fa fa-user-plus"></span>&nbsp;Next
            </button>
            </form>
            {this.state.showResetPasswordDialog3 ? 
                <ResetPasswordDialog3 
                    cancelDialog3={this.cancelDialog3}
                    accountSecurityQuestion={this.state.accountSecurityQuestion}
                    accountSecurityAnswer={this.state.accountSecurityAnswer}
                    accountName={this.props.accountName} /> : null}
            </div>
        </div>
        </div>
    </div>
    );
    }
}

export default ResetPasswordDialog2;