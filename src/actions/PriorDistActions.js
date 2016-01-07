/* @flow */ 
import { UPDATE_DISTRIBUTION, RESET_DISTRIBUTION } from './ActionTypes';
import Stage from '../types/Stage';
import Action from './Action';
import { Uniform, LogitNormal, Beta } from '../types/Distributions';

export function updateDistribution(distribution: Uniform | LogitNormal | Beta): Action {
    return {
      type: UPDATE_DISTRIBUTION,
      distribution: distribution
    };
}

export function resetDistribution(distribution: Uniform | LogitNormal | Beta): Action {
    return {
        type: RESET_DISTRIBUTION,
        distributionToReset: distribution
    };
}
