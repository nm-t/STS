/* @flow */
import React, {Component, PropTypes} from 'react';
import { map, reverse } from 'ramda';
import { round } from '../selectors/WeightSelectors';
import CardLineGraph from './CardLineGraph';

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
      <CardLineGraph
        data={passRateData}
        title="Positive predictive function"
        subtitle="Given trial is successful..."
        xLabel="True response probability"
        yLabel="Posterior probability"
       />
    );
  }

}
