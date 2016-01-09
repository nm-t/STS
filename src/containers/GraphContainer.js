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
import FailRatesByStageGraph from '../components/FailRatesByStageGraph';

class GraphContainer extends Component {
  // $FlowIssue
  static propTypes = {
    ctrGraphData: PropTypes.array.isRequired
  };

  render(): any {
    const { dispatch, ctrGraphData, failRatesByStage, ctrGivenSuccess, ctrGivenFailure } = this.props;
    return (
        <div className="pure-g">
          <div className="pure-u-1 pure-u-xl-1-2">
            <PassRateGraph ctrGraphData={ctrGraphData}/>
          </div>
          <div className="pure-u-1 pure-u-xl-1-2">
            <CtrGivenSuccessGraph ctrGivenSuccess={ctrGivenSuccess} />
          </div>
          <div className="pure-u-1 pure-u-xl-1-2">
            <CtrGivenFailureGraph ctrGivenFailure={ctrGivenFailure} />
          </div>
          <div className="pure-u-1 pure-u-xl-1-2">
            <FailRatesByStageGraph failRatesByStage={failRatesByStage} />
          </div>
        </div>
    );
  }
}

export default connect(combinedGraphSelector)(GraphContainer);
