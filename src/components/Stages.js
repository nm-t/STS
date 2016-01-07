/* @flow */
import React, {Component, PropTypes} from 'react';
import {StageCard} from '../components/StageCard';

export default class Stages extends Component {
  // $FlowIssue
  static propTypes = {
    updateStage: PropTypes.func.isRequired,
    stages: PropTypes.array.isRequired,
    totalParticipants: PropTypes.number.isRequired
  };

  render(): any {
    const { stages, updateStage, totalParticipants } = this.props;
    console.log(totalParticipants);
    return (
      <div>
        {stages.map((constrainedStage, index) => {
         const {
           stage,
           minThreshold,
           maxThreshold,
           minParticipants,
           maxParticipants
         } = constrainedStage;
         console.log(index, constrainedStage);
         return (<StageCard
           key={index}
           index={index}
           onParticipantsChange={updateStage}
           participants={stage.participants}
           threshold={stage.threshold}
           onThresholdChange={() => {}}
           minParticipants={minParticipants}
           maxParticipants={maxParticipants}
           minThreshold={minThreshold}
           maxThreshold={maxThreshold}
           totalParticipants={totalParticipants} />)
        })}
      </div>
    );
  }
}
