import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import FloatingButton from './FloatingButton.js';
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js"
import FeedPage from './FeedPage.js';
import Rounds from './Rounds.js';
import CoursesPage from './CoursesPage.js';
import CreateAccountDialog from './CreateAccountDialog.js';
import EditAccountDialog from './EditAccountDialog.js';
import Exercise from './Exercise.js'

const modeTitle = {};
modeTitle[AppMode.LOGIN] = "Welcome to the Workout Tracker";
modeTitle[AppMode.FEED] = "Activity Feed";
modeTitle[AppMode.ROUNDS] = "My Workouts";
modeTitle[AppMode.ROUNDS_LOGROUND] = "Log New Workout";
modeTitle[AppMode.ROUNDS_EDITROUND] = "Edit Workout";
modeTitle[AppMode.COURSES] = "Gyms";

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.FEED] = FeedPage;
modeToPage[AppMode.ROUNDS] = Exercise;
modeToPage[AppMode.ROUNDS_LOGROUND] = Exercise;
modeToPage[AppMode.ROUNDS_EDITROUND] = Exercise;
modeToPage[AppMode.COURSES] = CoursesPage;


class App extends React.Component {

  constructor() {
    super();
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  userId: "",
                  shoCreateAccountDialog: false
                  };
  }

  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  openMenu = () => {
    this.setState({menuOpen : true});
  }
  
  closeMenu = () => {
    this.setState({menuOpen : false});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  setUserId = (Id) => {
    this.setState({userId: Id});
  }

  cancelCreateAccount = () => {
    this.setState({shoCreateAccountDialog: false});
  }


  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div>
        <NavBar 
          title={modeTitle[this.state.mode]} 
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen}/>
          <SideMenu 
            menuOpen = {this.state.menuOpen}
            mode={this.state.mode}
            toggleMenuOpen={this.toggleMenuOpen}
            // newurl={this.state.newurl}
            // updatePic={this.updatePic}
            userId={this.state.userId}
            changeshoAccount={() => {this.setState({shoCreateAccountDialog: true});}}
            shoCreateAccountDialog={this.state.shoCreateAccountDialog}
            cancelCreateAccount={this.cancelCreateAccount}
            logOut={() => this.handleChangeMode(AppMode.LOGIN)}/>
          <ModeBar 
            mode={this.state.mode} 
            changeMode={this.handleChangeMode}
            menuOpen={this.state.menuOpen}/>
          <ModePage 
            menuOpen={this.state.menuOpen}
            mode={this.state.mode}
            changeMode={this.handleChangeMode}
            userId={this.state.userId}
            setUserId={this.setUserId} />
      </div>
    );  
  }
}

export default App;