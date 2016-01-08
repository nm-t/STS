/* @flow */
import React, {Component, PropTypes } from 'react';
import NVD3Chart from 'react-nvd3';
import DebouncedNumberEditor from './DebouncedNumberEditor';
import StageBar from './StageBar';
import Stage from '../types/Stage';
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
        updateStage: PropTypes.func.isRequired,
        removeStage: PropTypes.func.isRequired,
        participants: PropTypes.number.isRequired,
        threshold: PropTypes.number.isRequired,
        totalParticipants: PropTypes.number.isRequired,
        minThreshold: PropTypes.number.isRequired,
        maxThreshold: PropTypes.number.isRequired,
        minParticipants: PropTypes.number.isRequired,
        maxParticipants: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        removalAllowed: PropTypes.bool.isRequired
    };

  participantsChange(participantStr: string): any {
    const { minParticipants, maxParticipants, updateStage, threshold, index } = this.props;
    const participantNum = parseInt(participantStr);
    if (participantNum < minParticipants || participantNum > maxParticipants) return;
    updateStage(index, new Stage(participantNum, threshold));
  }

  thresholdChange(thresholdStr: string): any {
    const { minThreshold, maxThreshold, updateStage, participants, index } = this.props;
    const thresholdNum = parseInt(thresholdStr);
    if (thresholdNum < minThreshold || thresholdNum > maxThreshold) return;
    updateStage(index, new Stage(participants, thresholdNum));
  }

  render() {
      const {
        threshold,
        participants,
        totalParticipants,
        minParticipants,
        maxParticipants,
        minThreshold,
        maxThreshold,
        index,
        removeStage,
        removalAllowed
      } = this.props;

    return (
        <Card style={{width: "20em", marginTop: "1em"}}>
            <CardTitle subtitle={`Stage ${index + 1}`}/>
            <CardText>
            <span style={{paddingRight: "5em"}}>
            <StageBar participants={participants} threshold={threshold} totalParticipants={totalParticipants} />
                <DebouncedNumberEditor
                    step={1}
                    onValueChange={this.thresholdChange}
                    value={threshold}
                    min={minThreshold}
                    max={maxThreshold}
                    label="Threshold" />
            </span>
                <DebouncedNumberEditor
                    step={1}
                    onValueChange={this.participantsChange}
                    value={participants}
                    min={minParticipants}
                    max={maxParticipants}
                    label="Participants" />
            </CardText>
            <CardActions>
                <FlatButton label="Remove" onClick={() => removeStage(index)} disabled={!removalAllowed}/>
            </CardActions>
        </Card>
    );
  }
};
