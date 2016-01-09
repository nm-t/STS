/* @flow */
import React, {Component, PropTypes} from 'react';
import {StageCard} from '../components/StageCard';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Stages extends Component {
  // $FlowIssue
  static propTypes = {
    addStage: PropTypes.func.isRequired,
    updateStage: PropTypes.func.isRequired,
    removeStage: PropTypes.func.isRequired,
    stages: PropTypes.array.isRequired,
    totalParticipants: PropTypes.number.isRequired,
    removalAllowed: PropTypes.bool.isRequired
  };

  render(): any {
    const { stages, addStage, updateStage, removalAllowed, totalParticipants, removeStage } = this.props;
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
         return (<StageCard
           key={index}
           index={index}
           removeStage={removeStage}
           updateStage={updateStage}
           participants={stage.participants}
           threshold={stage.threshold}
           minParticipants={minParticipants}
           maxParticipants={maxParticipants}
           minThreshold={minThreshold}
           maxThreshold={maxThreshold}
           removalAllowed={removalAllowed}
           totalParticipants={totalParticipants} />)
        })}
        <div style={{margin: "1em"}} width="100%">
          <RaisedButton primary={true} label="Add Stage" onClick={addStage} style={{width: "100%"}}/>
        </div>
      </div>
    );
  }
}
