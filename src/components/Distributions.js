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
    currentDistribution: PropTypes.string.isRequired
  };

  render(): any {
    const { distributions, currentDistribution, updateDistribution } = this.props;
    const current = find(compose(equals(currentDistribution), prop("type")), distributions);

    return (
      <Card style={{ width: "20em", margin: "1em" }}>
        <Tabs>
          {distributions.map((dist, index) => (
            <Tab label={dist.type} value={dist.type} key={index}>
            hey there {dist.type}
              {current.paramDefinitions.map(def => (
                <DistributionParameter
                  paramDefinition={def}
                  distribution={current}
                  updateDistribution={updateDistribution}
                  key={`${current.type}:${def.paramProp}`}
                />))
              }
            </Tab>
        ))}
        </Tabs>
        <CardTitle subtitle="Prior Distribution"/>
        <CardText>


    </CardText>
      </Card>
    );
  }
}