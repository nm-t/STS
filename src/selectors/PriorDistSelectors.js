/* @flow */
import { createSelector } from 'reselect';
import R, {equals, prop, reject, compose, values, map} from 'ramda';

const log = R.curry((message, x) => { console.log(message, x); return x });

const distStateSelector = prop('propDist');

const distsSelector = compose(
  reject(compose(equals("String"), R.type)),
  values,
  distStateSelector
);

const distNamesSelector = compose(
  map(prop("type")),
  distsSelector
);

const currentDistSelector = compose(prop('currentDist'), distStateSelector);

export const distributionStateSelector = createSelector(
  distNamesSelector,
  currentDistSelector,
  distsSelector,
  (distributionNames, currentDistribution, distributions) => {
    return {
      distributionNames: distributionNames,
      currentDistribution: currentDistribution,
      distributions: distributions
    };
  }
);
