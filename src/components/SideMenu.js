import React from 'react';
import AppMode from './../AppMode.js';
import CreateAccountDialog from './CreateAccountDialog.js';
import EditAccountDialog from './EditAccountDialog.js';

class SideMenu extends React.Component {

  constructor() {
    super();
    this.setState = {url: "",
                     shoCreateAccountDialog: false
                    };
  }

  edit = () => {
    this.setState({shoCreateAccountDialog: true});
  }  

  // newAccountCreated = () => {
  //   this.setState({newAccountCreated: true,
  //                  shoCreateAccountDialog: false});
  // }

  // //cancelCreateAccount -- Called by child CreateAccountDialog componenet when user decides
  // //to cancel creation of new account by clicking the "X" in top-right of dialog.
  // cancelCreateAccount = () => {
  //     this.setState({shoCreateAccountDialog: false});
  // }

  updatePic = () => {
    let data = JSON.parse(localStorage.getItem(this.props.userId)); 
    if(data != null){
      if(data.profilePicDataURL == ""){
        this.url = data.profilePicURL;
      }
      else{
        this.url = data.profilePicDataURL;
      }
    }     
  }



//renderModeItems -- Renders correct subset of mode menu items based on
//current mode, which is stored in this.prop.mode. Uses switch statement to
//determine mode.
renderModeMenuItems = () => {
  switch (this.props.mode) {
    case AppMode.FEED:
      return(
        <div>
        <a className="sidemenu-item">
            <span className="fa fa-users"></span>&nbsp;Followed Users</a>
        <a className="sidemenu-item ">
            <span className="fa fa-search"></span>&nbsp;Search Feed</a>
        </div>
      );
    break;
    case AppMode.ROUNDS:
      return(
        <div>
          <a className="sidemenu-item">
            <span className="fa fa-plus"></span>&nbsp;Log New Workout</a>
          <a className="sidemenu-item">
            <span className="fa fa-search"></span>&nbsp;Search Workouts</a>
        </div>
      );
    break;
    case AppMode.COURSES:
      return(
        <div>
        <a className="sidemenu-item">
            <span className="fa fa-plus"></span>&nbsp;Add a Course</a>
        <a className="sidemenu-item">
            <span className="fa fa-search"></span>&nbsp;Search Courses</a>
        </div>
      );
    default:
        return null;
    }
}

    render() {
       return (
         
        <div className={"sidemenu " + (this.props.menuOpen ? "sidemenu-open" : "sidemenu-closed")}
             onClick={this.props.toggleMenuOpen}>
          {/* SIDE MENU TITLE */}
          {this.updatePic()}

          <div className="sidemenu-title">
              <img src={this.url} height='60' width='60' />
              <span id="userID" className="sidemenu-userID">&nbsp;{this.props.userId}</span>
          </div>
          {/* MENU CONTENT */}
          {this.renderModeMenuItems()}
          {/* The following menu items are present regardless of mode */}
          <a id="aboutBtn" className="sidemenu-item">
            <span className="fa fa-info-circle"></span>&nbsp;About</a>
          
          <a id="accountBtn" className="sidemenu-item" onClick={this.props.changeshoAccount}>
            <span className="fa fa-user"></span>&nbsp;Account</a>
        {this.props.shoCreateAccountDialog ? 
          <EditAccountDialog 
            logout={this.props.logOut}
            newAccountCreated={this.props.cancelCreateAccount}
            cancelCreateAccount={this.props.cancelCreateAccount} 
            userId={this.props.userId}
            /> : null}        

          <a id="logOutBtn" className="sidemenu-item" onClick={this.props.logOut}>
            <span className="fa fa-sign-out-alt"></span>&nbsp;Log Out</a>
        </div>
       );
    }
}

export default SideMenu;
