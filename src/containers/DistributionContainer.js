/* @flow */
import React, {Component, PropTypes} from 'react';
import { bindActionCreators, mapStateToProps } from 'redux';
import { connect } from 'react-redux';
import Distributions from '../components/Distributions';
import * as PriorDistActions from '../actions/PriorDistActions';
import { distributionWeightsSelector } from '../selectors/WeightSelectors';

class DistributionContainer extends Component {
  // $FlowIssue
  static propTypes = {
    distributionNames: PropTypes.array.isRequired,
    currentDistribution: PropTypes.object.isRequired,
    distributions: PropTypes.array.isRequired,
  };

  render(): any {
    const { dispatch } = this.props;
    return (
        <Distributions {...this.props} {...bindActionCreators(PriorDistActions, dispatch)} />
    );
  }
}

export default connect(distributionWeightsSelector)(DistributionContainer);
