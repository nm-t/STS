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
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

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
    const { resetDistribution, weights, distributions, currentDistribution, updateDistribution } = this.props;
    const distGraphData = [ { values: weights, key: "Weighting", color: "#2196F3" } ];

    return (
      <Card style={{ margin: "1em" }} initiallyExpanded={true}>
        <Tabs value={currentDistribution} onChange={dist => updateDistribution(dist)}>
          {distributions.map((dist, index) => (
            <Tab label={dist.type} value={dist} key={index}/>
          ))}
        </Tabs>
        <CardHeader
          avatar={ <div></div> }
          subtitle={`${currentDistribution.type} Prior Distribution`}
          actAsExpander={true}
          showExpandableButton={true}
        >
       </CardHeader>
       <div style={{padding: "1em", paddingTop: "-3em", marginTop: "-3em"}}>
         {currentDistribution.paramDefinitions.map(def => (
          <DistributionParameter
            paramDefinition={def}
            distribution={currentDistribution}
            updateDistribution={updateDistribution}
            key={`${currentDistribution.type}:${def.paramProp}`}
          />))}
        </div>
        <CardText expandable={true}>
        <div style={{marginLeft: "-3em", marginTop: "-2.5em"}}>
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
        </div>

        </CardText>
        <CardActions>
            <FlatButton label="Reset" onClick={() => resetDistribution(currentDistribution)} />
        </CardActions>
      </Card>
    );
  }
}
