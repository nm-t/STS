/* @flow */
import { createSelector } from 'reselect';
import { compose, map, curry, range } from 'ramda';
import { jStat } from 'jstat';
import { distributionStateSelector } from './PriorDistSelectors';

const interpolateRates = function(min, max, count) {
  if (count == 0) return [];
  if (count == 1) return [max];
  let rates = [min];
  const gap = (max - min) / (count - 1);
  let current = min;
  for (let i=1; i < count - 1; i++) {
    current += gap;
    rates[rates.length] = current;
  }
  rates[rates.length] = max;
  return rates;
};

const log = (x) => { console.log(x); return x; };

export const weightsSelector = createSelector(
  distributionStateSelector,
  distState => {
    const { currentDistribution: dist } = distState;
    const weights = map(dist.sampleFunc(dist), interpolateRates(0, 1, 101));
    return {weights: weights};
  }
);
