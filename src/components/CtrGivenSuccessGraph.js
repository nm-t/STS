/* @flow */
import React, {Component, PropTypes} from 'react';
import { map, reverse } from 'ramda';
import { round } from '../selectors/WeightSelectors';
import LineGraph from './LineGraph';

export default class CtrGivenSuccessGraph extends Component {
  // $FlowIssue
  static propTypes = {
    ctrGivenSuccess: PropTypes.array.isRequired
  };

  toXYPair(row: any): any {
    return { x: row.trueRate, y: round(1 - row.trGivenS) };
  }

  render(): any {
    const { ctrGivenSuccess } = this.props;
    const passRateData = map(this.toXYPair, ctrGivenSuccess);

    return (
      <LineGraph
        data={passRateData}
        title="Cumulative True Rate Given Success"
        xLabel="True Rate"
        yLabel="True Response Probability"
       />
    );
  }

}
