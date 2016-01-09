/* @flow */
import React, {Component, PropTypes} from 'react';
import { map, reverse } from 'ramda';
import { round } from '../selectors/WeightSelectors';
import LineGraph from './LineGraph';

export default class PassRateGraph extends Component {
  // $FlowIssue
  static propTypes = {
    ctrGraphData: PropTypes.array.isRequired
  };

  toXYPair(row: any): any {
    return { x: round(row.trueRate), y: round(row.passRate) };
  }

  render(): any {
    const { ctrGraphData } = this.props;
    const passRateData = map(this.toXYPair, ctrGraphData);

    return (
      <LineGraph
        data={passRateData}
        xLabel="True Rate"
        yLabel="Probability Trial Will Succeed"
        title="Cumulative Pass Rate"
      />
    );
  }

}
