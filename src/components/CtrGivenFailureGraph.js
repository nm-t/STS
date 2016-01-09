/* @flow */
import React, {Component, PropTypes} from 'react';
import { map, reverse } from 'ramda';
import { round } from '../selectors/WeightSelectors';
import LineGraph from './LineGraph';

export default class CtrGivenFailureGraph extends Component {
  // $FlowIssue
  static propTypes = {
    ctrGivenFailure: PropTypes.array.isRequired
  };

  toXYPair(row: any): any {
    return { x: row.trueRate, y: round(1 - row.trGivenF) };
  }

  render(): any {
    const { ctrGivenFailure } = this.props;
    const passRateData = map(this.toXYPair, ctrGivenFailure);

    return (
      <LineGraph
        data={passRateData}
        title="Cumulative True Rate Given Failure"
        xLabel="True Rate"
        yLabel="True Response Probability"
       />
    );
  }

}
