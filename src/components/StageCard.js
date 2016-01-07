/* @flow */
import React, {Component, PropTypes } from 'react';
import NVD3Chart from 'react-nvd3';
import NumberEditor from 'react-number-editor';
import DebouncedNumberEditor from './DebouncedNumberEditor';
import StageBar from './StageBar';
import Stage from '../classes/Stage';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';

export class StageCard extends Component {
    constructor() {
      super();
      this.participantsChange = this.participantsChange.bind(this);
      this.thresholdChange = this.thresholdChange.bind(this);
    }
    // $FlowIssue
    static propTypes = {
        onParticipantsChange: PropTypes.func.isRequired,
        participants: PropTypes.number.isRequired,
        onThresholdChange: PropTypes.func.isRequired,
        threshold: PropTypes.number.isRequired,
        totalParticipants: PropTypes.number.isRequired,
        minThreshold: PropTypes.number.isRequired,
        maxThreshold: PropTypes.number.isRequired,
        minParticipants: PropTypes.number.isRequired,
        maxParticipants: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired
    };

  participantsChange(participantStr: string): any {
    const { minParticipants, maxParticipants, onParticipantsChange, threshold, index } = this.props;
    const participantNum = parseInt(participantStr);
    if (participantNum < minParticipants || participantNum > maxParticipants) return;
    setTimeout(() => onParticipantsChange(index, new Stage(participantNum, threshold)), 10);
  }

  thresholdChange(thresholdStr: string): any {
    const { minThreshold, maxThreshold, onParticipantsChange, participants, index } = this.props;
    const thresholdNum = parseInt(thresholdStr);
    if (thresholdNum < minThreshold || thresholdNum > maxThreshold) return;
    setTimeout(() => onParticipantsChange(index, new Stage(participants, thresholdNum)), 10);
  }

  render() {
      const {
        threshold,
        participants,
        totalParticipants,
        minParticipants,
        maxParticipants,
        minThreshold,
        maxThreshold
      } = this.props;
    return (
        <Card style={{width: "20em"}}>
            <CardTitle subtitle="Stage 1"/>
            <CardText>
            <span style={{paddingRight: "5em"}}>
            <StageBar participants={participants} threshold={threshold} totalParticipants={totalParticipants} />
                <DebouncedNumberEditor
                    step={1}
                    onValueChange={this.participantsChange}
                    value={participants}
                    min={minParticipants}
                    max={maxParticipants}
                    label="Participants" />
            </span>
                <DebouncedNumberEditor
                    step={1}
                    onValueChange={this.thresholdChange}
                    value={threshold}
                    min={minThreshold}
                    max={maxThreshold}
                    label="Threshold" />
            </CardText>
            <CardActions>
                <FlatButton label="Remove" />
            </CardActions>
        </Card>
    );
  }
};
