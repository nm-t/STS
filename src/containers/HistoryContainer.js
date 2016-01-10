/* @flow */
import React, {Component, PropTypes} from 'react';
import { ActionCreators } from 'redux-undo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { historySelector } from '../selectors/HistorySelectors';
import ToolbarButtons from '../components/ToolbarButtons';

class HistoryContainer extends Component {
  // $FlowIssue
  static propTypes = {
    undoable: PropTypes.bool.isRequired,
    redoable: PropTypes.bool.isRequired
  };

  render(): any {
    const { dispatch } = this.props;
    return <ToolbarButtons {...this.props} undoAction={() => dispatch(ActionCreators.undo())} redoAction={() => dispatch(ActionCreators.redo())} />;
  }
}

export default connect(historySelector)(HistoryContainer);
