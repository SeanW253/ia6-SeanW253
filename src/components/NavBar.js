import React from 'react';
import AppMode from '../AppMode';

class NavBar extends React.Component {

  getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.ROUNDS_LOGROUND || 
          this.props.mode === AppMode.ROUNDS_EDITROUND)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
  }

  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.ROUNDS_LOGROUND ||
        this.props.mode === AppMode.ROUNDS_EDITROUND) {
      this.props.changeMode(AppMode.ROUNDS);
    } else if (this.props.mode != AppMode.LOGIN) {
      this.props.toggleMenuOpen();
    }
  }

    
  render() {
    return (
    <div className="navbar">  
    <span className="navbar-items">
      <button className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
        <span id="menuBtnIcon" className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}>
        </span>
      </button>
      <img src="https://media.istockphoto.com/vectors/boxing-gloves-vector-id667399656?k=6&m=667399656&s=612x612&w=0&h=o-lkqxwoX4nIPJ00oQdgFdUhdOPtix5mDzHyPeh4i8s=" alt="Speed Score Logo" height="38px"
      width="38px" />
      <span className="navbar-title">
        &nbsp;{this.props.title}
      </span>
    </span>
  </div>
); 
}
}

export default NavBar;
