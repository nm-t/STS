/* @flow */
import React, {Component, PropTypes } from 'react';
import NVD3Chart from 'react-nvd3';
import NumberEditor from 'react-number-editor';
import StageBar from './StageBar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';

export class StageCard extends Component {
    // $FlowIssue
    static propTypes = {
        onParticipantsChange: PropTypes.func.isRequired,
        participants: PropTypes.number.isRequired,
        onThresholdChange: PropTypes.func.isRequired,
        threshold: PropTypes.number.isRequired,
        totalParticipants: PropTypes.number.isRequired
    };

  render() {
      const {threshold, participants, onParticipantsChange, onThresholdChange, totalParticipants} = this.props;
    return (
        <Card style={{width: "20em"}}>
            <CardTitle subtitle="Stage 1"/>
            <CardText>
            <span style={{paddingRight: "5em"}}>
            <StageBar participants={participants} threshold={threshold} totalParticipants={totalParticipants} />
                <NumberEditor
                    step={1}
                    onValueChange={onParticipantsChange}
                    value={participants}
                    min={0}
                    max={100}
                    style={{width: "2.5em", textAlign: "center"}}
                    label="Participants" />
            </span>
                <NumberEditor
                    step={1}
                    onValueChange={onThresholdChange}
                    value={threshold}
                    min={0}
                    max={participants}
                    style={{width: "2.5em", textAlign: "center"}}
                    label="Threshold" />
            </CardText>
            <CardActions>
                <FlatButton label="Remove" />
            </CardActions>
        </Card>
    );
  }
};
