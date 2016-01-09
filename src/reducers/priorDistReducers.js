/* @flow */
import { UPDATE_DISTRIBUTION, RESET_DISTRIBUTION } from '../actions/ActionTypes';
import { Uniform, LogitNormal, Beta }  from '../types/DistributionDefinitions';
import Action from '../actions/Action';
import { eqProps, find, assoc, compose, update, remove, last, reduce, head } from 'ramda';

const distributions = [
  new Uniform(),
  new LogitNormal(),
  new Beta()
];

const initialState = reduce(
  (state, dist) => { state[dist.type] = dist; return state; },
  { currentDist: head(distributions).type },
  distributions
);

export default function priorDistReducers(state = initialState, action: Action): any {
   switch(action.type) {
     case UPDATE_DISTRIBUTION:
       const { distribution } = action;
       return compose(
           assoc('currentDist', distribution.type),
           assoc(distribution.type, distribution)
        )(state);
     case RESET_DISTRIBUTION:
       const { distributionToReset } = action;
       const initialDist = find(eqProps('type', distributionToReset), distributions);
       return assoc(distributionToReset.type, initialDist, state);
     default:
       return state;
   }
}
