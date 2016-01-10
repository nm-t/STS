import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';

export default class ToolbarButtons extends Component {
  // $FlowIssue
  static propTypes = {
    undoable: PropTypes.bool.isRequired,
    redoable: PropTypes.bool.isRequired,
    undoAction: PropTypes.func.isRequired,
    redoAction: PropTypes.func.isRequired
  };

  render(): any {
    const { undoAction, redoAction, undoable, redoable } = this.props;
    return (
      <span>
        <IconButton
          iconClassName="material-icons"
          tooltipPosition="bottom-left"
          tooltip="Undo"
          onClick={undoAction}
          disabled={!undoable}
          iconStyle={undoable ? {color: "white"} : {}}>
            undo
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          tooltipPosition="bottom-left"
          tooltip="Redo"
          onClick={redoAction}
          disabled={!redoable}
          iconStyle={redoable ? {color: "white"} : {}}>
            redo
        </IconButton>
      </span>);
  }
}
