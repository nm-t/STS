/* @flow */
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import DistributionParameter from './DistributionParameter';
import NVD3Chart from 'react-nvd3';
import { prop, find, compose, equals } from 'ramda';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export default class Distributions extends Component {
  // $FlowIssue
  static propTypes = {
    updateDistribution: PropTypes.func.isRequired,
    resetDistribution: PropTypes.func.isRequired,
    distributions: PropTypes.array.isRequired,
    distributionNames: PropTypes.array.isRequired,
    currentDistribution: PropTypes.object.isRequired
  };

  render(): any {
    const { weights, distributions, currentDistribution, updateDistribution } = this.props;
    const distGraphData = [ { values: weights, key: "Weighting", color: "#2196F3" } ];

    return (
      <Card style={{ width: "90%", margin: "1em" }} initiallyExpanded={true}>
        <Tabs onChange={dist => updateDistribution(dist)}>
          {distributions.map((dist, index) => (
            <Tab label={dist.type} value={dist} key={index}/>
          ))}
        </Tabs>
        <CardHeader
          avatar={ <div></div> }
          subtitle={`${currentDistribution.type} Prior Distribution`}
          actAsExpander={true}
          showExpandableButton={true}
          style={{marginBottom: "3em" }}
        >
           <div>{currentDistribution.paramDefinitions.map(def => (
            <DistributionParameter
              paramDefinition={def}
              distribution={currentDistribution}
              updateDistribution={updateDistribution}
              key={`${currentDistribution.type}:${def.paramProp}`}
            />))}</div> 
       </CardHeader>
        <CardText expandable={true}>
        <div style={{marginLeft: "-3em", marginTop: "-2.5em"}}>
          <NVD3Chart
            type="lineChart"
            datum={distGraphData}
            showLegend={false}
            interactive={false}
            pointSize={0}
            interpolate="linear"
            height="20em"
            showYAxis={false}
            forceY={[0,1]}
            xAxis={{
              axisLabel: "True response probability",
              tickFormat: x => {
                if (x === 1) return x;
                return '≥' + x;
              },
              tickValues: [0,0.2,0.4,0.6,0.8,1]
            }}
          />
        </div>

        </CardText>
      </Card>
    );
  }
}
