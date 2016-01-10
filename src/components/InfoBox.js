import React, { PropTypes, Component } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
import Dialog from 'material-ui/lib/dialog';

export default class InfoBox extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  render(): any {
    const { title, open, onRequestClose } = this.props;

    return (
      <Dialog
        title={title}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        actions={<FlatButton label="Close" onTouchTap={onRequestClose} />}
        open={open}
        onRequestClose={onRequestClose}
        contentStyle={{width: "90%", maxWidth: "40em", fontWeight: 300 }}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
