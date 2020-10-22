import React from 'react'

class ResetPasswordDialog3 extends React.Component {
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
                      };

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

    // //validate security question
    // validateSecurityQuestion = () => {
    //     let correctAns = this.props.accountSecurityAnswer;
    //     let userAns = this.state.accountSecurityAnswer;

    //     if (userAns == correctAns) {
    //         this.setState({showResetPasswordDialog3: true});
    //     }
    // }

    //handleDialog1 - after the first dialog box, user finishes entering username, take to
    //the next dialog
    handleDialog3 = (event) => {
        event.preventDefault();

        let user = this.props.accountName;
        let data = JSON.parse(localStorage.getItem(user));

        //data.accountPassword = this.state.accountPasswordRepeat;

        let newData = {};

        newData.displayName = user;
        newData.exerciseData = data.exerciseData;
        newData.exerciseDataCount = data.exerciseDataCount;
        newData.password = this.state.accountPasswordRepeat;
        newData.profilePicDataURL = data.profilePicDataURL;
        newData.securityAnswer = data.securityAnswer;
        newData.securityQuestion = data.securityQuestion;

        localStorage.setItem(user, JSON.stringify(newData));

        this.props.cancelDialog3();
    }

    render() {
    return (
    <div className="modal" role="dialog">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <center>
            <h3 className="modal-title"><b>Enter new password</b></h3>
            </center>
            <button className="close" 
                onClick={this.props.cancelDialog3}>
                &times;</button>
            </div>
            <div className="modal-body">
            <form onSubmit={this.handleDialog3}>
            
            <label>
                Password:
                <input
                className="form-control form-text form-center"
                name="accountPassword"
                type="password"
                size="35"
                placeholder="Enter Password"
                pattern=
                "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                required={true}
                value={this.state.accountPassword}
                onChange={this.handleNewAccountChange}
                />
            </label>
            <br/>
            <label>
                Repeat Password:
                <input
                className="form-control form-text form-center"
                name="accountPasswordRepeat"
                type="password"
                size="35"
                placeholder="Repeat Password"
                required={true}
                ref={this.repeatPassRef}
                value={this.state.accountPasswordRepeat}
                onChange={this.handleNewAccountChange}
                />
            </label>
            <br/>

            <button role="submit"
                className="btn btn-primary btn-color-theme modal-submit-btn">
                <span className="fa fa-user-plus"></span>&nbsp;Reset
            </button>
            </form>
            {/* {this.state.showResetPasswordDialog2 ? <ResetPasswordDialog2 /> : null} */}
            </div>
        </div>
        </div>
    </div>
    );
    }
}

export default ResetPasswordDialog3;