/* @flow */
import React, {Component, PropTypes} from 'react';
import NVD3Chart from 'react-nvd3';

export default class DistributionGraph extends Component {
  // $FlowIssue
  static propTypes = {
    currentDistribution: PropTypes.object.isRequired,
    weights: PropTypes.array.isRequired
  };

  render(): any {
    const { weights, currentDistribution } = this.props;
    const distGraphData = [ { values: weights, key: "Weighting", color: "#2196F3" } ];

    return (
      <NVD3Chart
        type="lineChart"
        datum={distGraphData}
        showLegend={false}
        interactive={false}
        pointSize={0}
        interpolate={currentDistribution.type === "Uniform" ? "linear" : "basis"}
        height="20em"
        showYAxis={false}
        forceY={[0,1]}
        xAxis={{
          axisLabel: "True response probability",
          tickFormat: x => {
            if (x === 1) return x;
            return '≥' + x;
          },
          tickValues: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
        }}
        forceX={[0,1]}
      />
    );
  }
}
