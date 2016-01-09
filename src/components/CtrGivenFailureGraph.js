/* @flow */
import React, {Component, PropTypes} from 'react';
import { map, reverse } from 'ramda';
import { round } from '../selectors/WeightSelectors';
import CardLineGraph from './CardLineGraph';

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
      <CardLineGraph
        data={passRateData}
        title="Negative predictive function"
        xLabel="True response probability"
        yLabel="Posterior probability"
        subtitle="Given trial stops early..."
       />
    );
  }

}
