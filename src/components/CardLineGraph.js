/* @flow */
import React, {Component, PropTypes} from 'react';
import CardContainer from './CardContainer';
import { round } from '../selectors/WeightSelectors';
import LineGraph from './LineGraph';

export default class CardLineGraph extends Component {
  // $FlowIssue
  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
  };

  render(): any {
    const { subtitle, title } = this.props;
    return (
        <CardContainer title={title} subtitle={subtitle}>
          <LineGraph {...this.props} />
        </CardContainer>
    );
  }

}
