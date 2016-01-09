/* @flow */
import React, {Component, PropTypes} from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import NVD3Chart from 'react-nvd3';

export default class LineGraph extends Component {
  // $FlowIssue
  static propTypes = {
    data: PropTypes.array.isRequired,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  // $FlowIssue
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  render(): any {
    const { title, data, xLabel, yLabel } = this.props;
    const graphData = [
      {
        values: data,
        key: title,
        color: "#2196F3"
      }
    ];

    return (
      <NVD3Chart
        type="lineChart"
        datum={graphData}
        useInteractiveGuideline={true}
        showLegend={false}
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
        height="30em"
        forceY={[0,1]}
        forceX={[0,1]}
      />
    );
  }

}
