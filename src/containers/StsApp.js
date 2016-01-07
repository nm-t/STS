/* @flow */
import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StageActions from '../actions/StageActions';
import Stages from '../components/Stages';

class StsApp extends Component {
  // $FlowIssue
  static propTypes = {
    updateStage: PropTypes.func.isRequired,
    stages: PropTypes.array.isRequired
  };

  render(): any {
    const { stages, dispatch } = this.props;
    return (
        <Stages stages={stages} {...bindActionCreators(StageActions, dispatch)} />
    );
  }
}

const select = (state) => ({ stages: state.stage.stages });

export default connect(select)(StsApp);
