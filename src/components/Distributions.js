/* @flow */
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import DistributionParameter from './DistributionParameter';
import { prop, find, compose, equals } from 'ramda';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
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
    const { distributions, currentDistribution, updateDistribution } = this.props;

    return (
      <Card style={{ width: "20em", margin: "1em" }}>
        <Tabs onChange={dist => updateDistribution(dist)}>
          {distributions.map((dist, index) => (
            <Tab label={dist.type} value={dist} key={index}>
            </Tab>
        ))}
        </Tabs>
        <CardTitle subtitle={`${currentDistribution.type} Distribution`}/>
        <CardText>
          {currentDistribution.paramDefinitions.map(def => (
            <DistributionParameter
              paramDefinition={def}
              distribution={currentDistribution}
              updateDistribution={updateDistribution}
              key={`${currentDistribution.type}:${def.paramProp}`}
            />))
          }
        </CardText>
      </Card>
    );
  }
}
