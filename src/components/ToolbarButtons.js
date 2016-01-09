import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';

export default class ToolbarButtons extends Component {
  static propTypes = {
    undoAction: PropTypes.func.isRequired,
    redoAction: PropTypes.func.isRequired
  };

  render(): any {
    const { undoAction, redoAction } = this.props;
    return (
      <span>
        <IconButton
          iconClassName="material-icons"
          tooltipPosition="bottom-left"
          tooltip="Undo"
          onClick={undoAction}
          iconStyle={{color: "white"}}>
            undo
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          tooltipPosition="bottom-left"
          tooltip="Redo"
          onClick={redoAction}
          iconStyle={{color: "white"}}>
            redo
        </IconButton>
      </span>);
  }
}
