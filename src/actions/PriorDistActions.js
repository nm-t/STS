/* @flow */ 
import { UPDATE_DISTRIBUTION, RESET_DISTRIBUTION } from './ActionTypes';
import Stage from '../types/Stage';
import Action from './Action';
import { Distribution } from '../types/Distributions';

export function updateDistribution(distribution: Distribution): Action {
    return {
      type: UPDATE_DISTRIBUTION,
      distribution
    };
}

export function resetDistribution(distributionToReset: Distribution): Action {
    return {
        type: RESET_DISTRIBUTION,
        distributionToReset
    };
}
