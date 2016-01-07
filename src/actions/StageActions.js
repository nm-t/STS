/* @flow */ 
import { ADD_STAGE, UPDATE_STAGE, REMOVE_STAGE } from './ActionTypes';
import Stage from '../classes/Stage';
import Action from './Action';

export function addStage(): Action {
    return {
      type: ADD_STAGE
    };
}

export function updateStage(index: number, stage: Stage): Action {
    return {
        type: UPDATE_STAGE,
        stage: stage,
        index: index
    };
}

export function removeStage(index: number): Action {
    return {
        type: REMOVE_STAGE,
        index: index
    };
}
