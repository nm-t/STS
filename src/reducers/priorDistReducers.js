/* @flow */
import { UPDATE_DISTRIBUTION, RESET_DISTRIBUTION } from '../actions/ActionTypes';
import { Uniform, LogitNormal, Beta }  from '../types/Distributions';
import Action from '../actions/Action';
import { propEq, find, assoc, compose, head, update, remove, last, reduce, head } from 'ramda';

const distributions = [new Uniform(0, 1), new LogitNormal(0, 0.5), new Beta(2, 2)]

const initialState = reduce(
  (state, dist) => { state[dist.type] = dist; return state; },
  { currentDist: head(distributions) },
  distributions
);

export default function stageReducers(state = initialState, action: Action): any {
   switch(action.type) {
     case UPDATE_DISTRIBUTION:
       const { distribution } = action;
       return compose(
           assoc('currentDist', distribution.type),
           assoc(distribution.type, distribution)
        )(state);
     case RESET_DISTRIBUTION:
       const { distributionToReset } = action;
       const initalDist = find(propEq('type', distributionToReset), distributions);
       return assoc(distributionToReset.type, initalDist, state);
     default:
       return state;
   }
}
