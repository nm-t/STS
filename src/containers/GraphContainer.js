/* @flow */
import React, {Component, PropTypes} from 'react';
import { bindActionCreators, mapStateToProps } from 'redux';
import { connect } from 'react-redux';
import { map, reverse } from 'ramda';
import { combinedGraphSelector } from '../selectors/CombinedGraphSelector';
import NVD3Chart from 'react-nvd3';
import PassRateGraph from '../components/PassRateGraph';
import CtrGivenSuccessGraph from '../components/CtrGivenSuccessGraph';
import CtrGivenFailureGraph from '../components/CtrGivenFailureGraph';

class GraphContainer extends Component {
  // $FlowIssue
  static propTypes = {
    ctrGraphData: PropTypes.array.isRequired
  };

  render(): any {
    const { dispatch, ctrGraphData, ctrGivenSuccess, ctrGivenFailure } = this.props;
    return (
        <div style={{height: "500px", width: "500px"}}>
          <PassRateGraph ctrGraphData={ctrGraphData} />
          <CtrGivenSuccessGraph ctrGivenSuccess={ctrGivenSuccess} />
          <CtrGivenFailureGraph ctrGivenFailure={ctrGivenFailure} />
        </div>
    );
  }
}

export default connect(combinedGraphSelector)(GraphContainer);
