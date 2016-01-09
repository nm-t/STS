/* @flow */
import React, {Component, PropTypes} from 'react';
import { round } from '../selectors/WeightSelectors';
import NVD3Chart from 'react-nvd3';

export default class LineGraph extends Component {
  // $FlowIssue
  static propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
  };

  render(): any {
    const { data, title, xLabel, yLabel } = this.props;
    const graphData = [
      {
        values: data,
        key: title
      }
    ];

    return (
      <NVD3Chart
        type="lineChart"
        datum={graphData}
        useInteractiveGuideline={true}
        xAxis={{
          axisLabel: xLabel, 
          tickFormat: x => {
            if (x === 1) return x;
            return '≥' + x;
          },
          tickValues: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
        }}
        yAxis={{
          axisLabel: yLabel,
          tickValues: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
        }}
        interpolate="linear"
        height="500px"
        width="500px"
        forceY={[0,1]}
        forceX={[0,1]}
      />
    );
  }

}
