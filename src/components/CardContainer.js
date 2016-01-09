/* @flow */
import React, {Component, PropTypes} from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import { round } from '../selectors/WeightSelectors';
import LineGraph from './LineGraph';

export default class CardContainer extends Component {
  // $FlowIssue
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  };

  render(): any {
    const { subtitle, title } = this.props;
    return (
        <Card style={{
          paddingLeft: "0.8em",
          paddingRight: "0.5em",
          paddingTop: "0.5em",
          paddingBottom: "0.5em",
          margin: "1em",
        }}>
          <CardHeader
            title={title}
            subtitle={subtitle}
            avatar={<div></div>}
            style={{marginBottom: "-2em", paddingBottom: "-1em" }}
          />
          <CardText>
            {this.props.children}
         </CardText>
       </Card>
    );
  }

}
