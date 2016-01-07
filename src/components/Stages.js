/* @flow */
import React, {Component, PropTypes} from 'react';
import {StageCard} from '../components/StageCard';

export default class Stages extends Component {
  // $FlowIssue
  static propTypes = {
    updateStage: PropTypes.func.isRequired,
    stages: PropTypes.array.isRequired,
  };

  render(): any {
    const { stages } = this.props;
    return (
      <div>
        {stages.map((stage, index) =>
         (<StageCard
           key={index}
           onParticipantsChange={() => {}}
           participants={stage.participants}
           threshold={stage.threshold}
           onThresholdChange={() => {}}
           totalParticipants={100} />)
        )}
      </div>
    );
  }
}
