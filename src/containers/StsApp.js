/* @flow */
import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StageActions from '../actions/StageActions';

class StsApp extends Component {
  // $FlowIssue
  static propTypes = {
    updateStage: PropTypes.func.isRequired,
    stages: PropTypes.array.isRequired
  };

  render(): any {
    const { stages, dispatch } = this.props;
    return (<div>STS</div>);
  }
}

const select = (state) => ({ stages: state.stage.stages });

export default connect(select)(StsApp);
