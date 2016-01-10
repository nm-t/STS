/* @flow */
import React, {Component, PropTypes} from 'react';
import { contains, transpose, compose, map, update, assoc, last } from 'ramda';
import { round } from '../selectors/WeightSelectors';
import NVD3Chart from 'react-nvd3';
import CardContainer from './CardContainer';

export default class FailRatesByStageGraph extends Component {
  // $FlowIssue
  static propTypes = {
    failRatesByStage: PropTypes.array.isRequired
  };

  toGraphData(stagesData: any): any {
    const colors = ["#2196F3","#81a4d0","#ff5252","#FF7575","#4f47b4","#918bdf"];
    const stages = stagesData.map(
      (stageData, index) => ({
        key: `Stage ${index + 1}`,
        values: stageData,
        color: index === stagesData.length - 1 ? "#EDEDED" : colors[index]
      })
    );
    const lastIndex = stages.length - 1;
    return update(lastIndex, compose(assoc('key', 'Passed'), last)(stages), stages);
  };

  render(): any {
    const { failRatesByStage } = this.props;
    const graphData = this.toGraphData(failRatesByStage);
    return (
      <CardContainer title="Distribution of end stages across true response probabilities">
        <NVD3Chart
          datum={graphData}
          type="multiBarChart"
          stacked={true}
          x="trueRate"
          height="30em"
          y="failRate"
          xAxis={{
            axisLabel: "True response probability",
            tickFormat: (x, isAxis) => {
              if (!contains(x, [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]) && isAxis) return '';
              if (x === 1) return x;
              return `≥${x}`;
            },
          }}
          reduceXTicks={false}
          forceX={[0,1]}
          yAxis={{
            axisLabel: "End stage proportion",
            tickValues: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
          }}
          duration={128}
         />
      </CardContainer>
    );
  }

}
