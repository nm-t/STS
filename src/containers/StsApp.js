/* @flow */
import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stages from '../components/Stages';
import * as StageActions from '../actions/StageActions';
import { constrainedStagesSelector } from '../selectors/StageSelectors';

class StsApp extends Component {
  // $FlowIssue
  static propTypes = {
    stages: PropTypes.array.isRequired,
    totalParticipants: PropTypes.number.isRequired
  };

  render(): any {
    const { stages, dispatch, totalParticipants } = this.props;
    return (
        <Stages stages={stages} totalParticipants={totalParticipants} {...bindActionCreators(StageActions, dispatch)} />
    );
  }
}

export default connect(constrainedStagesSelector)(StsApp);
