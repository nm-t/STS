/* @flow */
import { createSelector } from 'reselect';
import R, {isNil, find, path, equals, prop, reject, compose, values, map} from 'ramda';

const log = R.curry((message, x) => { console.log(message, x); return x });

const distStateSelector = path(['propDist', 'present']);

const distsSelector = compose(
  reject(compose(equals("String"), R.type)),
  reject(isNil),
  values,
  distStateSelector
);

const distNamesSelector = compose(
  map(prop("type")),
  distsSelector
);

export const currentDistSelector = compose(prop('currentDist'), distStateSelector);


export const distributionStateSelector = createSelector(
  distNamesSelector,
  currentDistSelector,
  distsSelector,
  (distributionNames, currentDistribution, distributions) => {
    return {
      distributionNames: distributionNames,
      distributions: distributions,
      currentDistribution: find(compose(equals(currentDistribution), prop("type")), distributions)
    };
  }
);
