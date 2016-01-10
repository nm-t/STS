import React, { PropTypes, Component } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import AboutBox from './AboutBox';
import ContactBox from './ContactBox';
import HowToUseBox from './HowToUseBox';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHowToUseOpen: false,
      isAboutOpen: false,
      isContactOpen: false
    };
  }

  render(): any {
    const toggleProp = propName => () => {
      let updatedState = {};
      updatedState[propName] = !this.state[propName]
      this.setState(updatedState);
    };

    const { isHowToUseOpen, isAboutOpen, isContactOpen } = this.state;

    return (
        <div>
          <IconMenu iconButtonElement={
            <IconButton iconStyle={{color: "white"}} iconClassName="material-icons">menu</IconButton>
          }>
            <MenuItem primaryText="How to use" leftIcon={<FontIcon className="material-icons">gesture</FontIcon>} onClick={toggleProp("isHowToUseOpen")}/>
            <MenuItem primaryText="About" leftIcon={<FontIcon className="material-icons">chrome_reader_mode</FontIcon>} onClick={toggleProp("isAboutOpen")}/>
            <MenuItem primaryText="Contact" leftIcon={<FontIcon className="material-icons">face</FontIcon>} onClick={toggleProp("isContactOpen")}/>
          </IconMenu>
          <HowToUseBox open={isHowToUseOpen} onRequestClose={toggleProp("isHowToUseOpen")}/>
          <AboutBox open={isAboutOpen} onRequestClose={toggleProp("isAboutOpen")}/>
          <ContactBox open={isContactOpen} onRequestClose={toggleProp("isContactOpen")}/>
        </div>
    );
  }
}
