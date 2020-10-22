import React from 'react';
import SideMenu from './SideMenu';
import DeleteBox from './DeleteBox.js';
import LoginPage from './LoginPage.js';

class EditAccountDialog extends React.Component {

    constructor(props) {
        super(props);
        
        let data = JSON.parse(localStorage.getItem(this.props.userId)); 
        if (data == null) { //no data yet for this user -- create empty record
            data = {accountName: "",
            displayName: "",
            profilePicDataURL: "",
            profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
            accountPassword: "",
            accountPasswordRepeat: "",
            accountSecurityQuestion: "",
            accountSecurityAnswer: "",
            showDeleteAccount: false,
            login: false
            };  
        }   
        //Create a ref for the email input DOM element
        this.newUserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        this.state = {accountName: this.props.userId,
                      displayName: data.displayName,
                      profilePicDataURL: data.profilePicDataURL,
                      profilePicURL: data.profilePicDataURL,
                      accountPassword: data.password,
                      accountPasswordRepeat: "",
                      accountSecurityQuestion: data.securityQuestion,
                      accountSecurityAnswer: data.securityAnswer,
                      showDeleteAccount: false,
                      login: false
                    };
    }

    //checkAccountValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We need to check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    checkAccountValidity = () => {
        let data1 = JSON.parse(localStorage.getItem(this.props.userId)); 
        if(this.state.accountPassword != data1.password){
            if (this.state.accountPassword != this.state.accountPasswordRepeat) {
                //Passwords don't match
                this.repeatPassRef.current.setCustomValidity(
                "This password must match original password.");
            } else {
                this.repeatPassRef.current.setCustomValidity("");
            }    
        }
        // let data = JSON.parse(localStorage.getItem(this.newUserRef.current.value));
        // if (data != null) {
        //     //The user name is already taken
        //     this.newUserRef.current.setCustomValidity("An account already exists under this email address. " +
        //       "Use 'Reset password' to recover the password.");
        // } else {
        //     this.newUserRef.current.setCustomValidity("");
        // }
    }

    //handleNewAccountChange--Called when a field in a dialog box form changes.
    handleNewAccountChange = (event) => {
        if (event.target.name === "profilePic") {
            if (event.target.value.length == 0) { //The user canceled the file selection -- set back to default
                this.setState({profilePicDataURL: "",
                profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg"});
            } else { //The user selected a file
                const self = this;
                const val = event.target.value;
                const reader = new FileReader();
                reader.readAsDataURL(this.profilePicRef.current.files[0]);
                reader.addEventListener("load",function() {
                    self.setState({profilePicURL: "",
                                   profilePicDataURL: this.result});
                });
            }
        } else {
            this.setState({[event.target.name]: event.target.value},this.checkAccountValidity);
        }
    } 

    //setDefaultDisplayName -- Triggered by onBlur() event of Email field.
    //Sets default value of display name to value entered into Email field 
    //as a courtesy.
    setDefaultDisplayName = (event) => {
      if (event.target.value.length > 0 && this.state.displayName === "") {
        this.setState({displayName: event.target.value});
      }
    }

    //handleCreateAccount -- Triggered when user clicks on "Create Account" button.
    //Custom data checking ensures user account under this email does not 
    //already exist and that the rest of the info is valid. We create a new  
    // object for user, save it to localStorage and take user to app's 
    //landing page. 
    handleCreateAccount = (event) => {
        event.preventDefault();
        //Initialize user account
        let userData = {
            displayName: this.state.displayName,
            password: this.state.accountPassword,
            profilePicURL: this.state.profilePicURL, //if empty, use default
            profilePicDataURL: this.state.profilePicDataURL,
            securityQuestion: this.state.accountSecurityQuestion,
            securityAnswer: this.state.accountSecurityAnswer
        };

        if(this.state.login == true){
            localStorage.removeItem(this.props.userId);
            this.props.logout();
        }
        else{
            //Commit to local storage
            localStorage.setItem(this.state.accountName,JSON.stringify(userData));
        }
        //Invite user to log in using new account
       this.props.newAccountCreated();
        
    }

    makeDeletionTrue = () => {
            // this.setState({showDeleteAccount: true});
            this.state.showDeleteAccount = true;
    }
    makeDeletionFalse = () => {
        this.setState({showDeleteAccount: false});
    }


    deleteAccount = () => {
        // localStorage.removeItem(this.props.userId);
        this.setState({login: true});
    }    

    render() {
        return (
        <div className="modal" role="dialog">
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                <center>
                <h3 className="modal-title"><b>Edit Account</b></h3>
                </center>
                <button className="close" 
                    onClick={this.props.cancelCreateAccount}>
                    &times;</button>
                </div>
                <div className="modal-body">
                <form onSubmit={this.handleCreateAccount}>
                <label>
                    Email: 
                    <input
                    className="form-control form-text form-center"
                    name="accountName"
                    type="email"
                    size="35"
                    placeholder="Email"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                    required={true}
                    ref={this.newUserRef}
                    value={this.state.accountName}
                    onChange={this.handleNewAccountChange}
                    onBlur={this.setDefaultDisplayName}
                    />
                </label>
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
                <label>
                    Repeat Password:
                    <input
                    className="form-control form-text form-center"
                    name="accountPasswordRepeat"
                    type="password"
                    size="35"
                    placeholder=""
                    // required={true}
                    ref={this.repeatPassRef}
                    value={this.state.accountPasswordRepeat}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                <label>
                    Display Name:
                    <input
                    className="form-control form-text form-center"
                    name="displayName"
                    type="text"
                    size="30"
                    placeholder="Display Name"
                    required={true}
                    value={this.state.displayName}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                <label>
                    Profile Picture:<br/>
                    <input
                    className="form-control form-text form-center"
                    name="profilePic"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg" 
                    ref={this.profilePicRef}
                    value={this.state.profilePic}
                    onChange={this.handleNewAccountChange}
                    />
                    <img src={this.state.profilePicURL != "" ? 
                                this.state.profilePicURL :
                                this.state.profilePicDataURL} 
                            height="60" width="60" />
                </label> 
                <label>
                    Security Question:
                    <textarea
                    className="form-control form-text form-center"
                    name="accountSecurityQuestion"
                    size="35"
                    placeholder={this.state.accountSecurityQuestion}
                    rows="2"
                    cols="35"
                    maxLength="100"
                    required={true}
                    value={this.state.accountSecurityQuestion}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                <label>
                    Answer to Security Question:
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
                <button role="submit" onSubmit={this.props.updatePic} 
                    className="btn btn-primary btn-color-theme modal-submit-btn">
                    <span className="fa fa-user-plus"></span>&nbsp;Update Account Info
                </button>
                <button onClick={this.deleteAccount}
                    className="btn btn-primary btn-color-theme modal-submit-btn">
                    <span className="fa fa-user-plus"></span>&nbsp;Delete Account
                </button>

                </form>
                </div>
            </div>
            </div>
            {/* <SideMenu 
            newURL={this.profilePicDataURL}/> */}
            {this.state.showDeleteAccount ? 
                <DeleteBox
                toggleDeletion={this.makeDeletionFalse}
                deleteAccount={this.deleteAccount} /> 
                : null}
            {/* {this.state.login ? 
                this.props.logout : null} */}

        </div>
        );
    }
}

export default EditAccountDialog;