/* @flow */ 
import { ADD_STAGE, UPDATE_STAGE, REMOVE_STAGE } from './ActionTypes';
import Stage from '../classes/Stage';
import Action from './Action';

export function addStage(): Action {
    return new Action(ADD_STAGE);
}

export function updateStage(stage: Stage): Action {
    return {
        type: UPDATE_STAGE,
        stage: stage
    };
}

export function removeStage(stageNumber: number): Action {
    return {
        type: REMOVE_STAGE,
        stageNumber: stageNumber
    };
}
