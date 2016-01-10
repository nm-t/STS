import React, { PropTypes, Component } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import AboutBox from './AboutBox';
import ContactBox from './ContactBox';
import HowToUseBox from './HowToUseBox';
import { curry } from 'ramda';

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
    const setVisibility = curry((propName, visible) => () => {
      let updatedState = {};
      updatedState[propName] = visible;
      this.setState(updatedState);
    });

    const setHowToUse = setVisibility("isHowToUseOpen");
    const setAbout = setVisibility("isAboutOpen");
    const setContact = setVisibility("isContactOpen");

    const { isHowToUseOpen, isAboutOpen, isContactOpen } = this.state;

    return (
        <div>
          <IconMenu iconButtonElement={
            <IconButton iconStyle={{color: "white"}} iconClassName="material-icons">menu</IconButton>
          }>
            <MenuItem primaryText="Instructions" leftIcon={<FontIcon className="material-icons">gesture</FontIcon>} onClick={setHowToUse(true)}/>
            <MenuItem primaryText="About" leftIcon={<FontIcon className="material-icons">chrome_reader_mode</FontIcon>} onClick={setAbout(true)}/>
            <MenuItem primaryText="Contact" leftIcon={<FontIcon className="material-icons">face</FontIcon>} onClick={setContact(true)}/>
          </IconMenu>
          <HowToUseBox open={isHowToUseOpen} onRequestClose={setHowToUse(false)}/>
          <AboutBox open={isAboutOpen} onRequestClose={setAbout(false)}/>
          <ContactBox open={isContactOpen} onRequestClose={setContact(false)}/>
        </div>
    );
  }
}
