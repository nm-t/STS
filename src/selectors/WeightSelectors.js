/* @flow */
import { createSelector } from 'reselect';
import { zipWith, assoc, scan, add, compose, map, curry, range } from 'ramda';
import { distributionStateSelector } from './PriorDistSelectors';

const interpolateRates = function(min: number, max: number, count: number): Array<number> {
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

// Hardcoding this for now, can make this configurable in future.
export const trueRates = interpolateRates(0, 1, 30);

export function round(x: number): number { return (Math.ceil(x * 1000) / 1000) };

export const cumulative = scan(add, 0.0);

export const weightsSelector = createSelector(
  distributionStateSelector,
  distState => {
    const { currentDistribution: dist } = distState;
    return map(dist.sampleFunc(dist), trueRates);
  }
);

export const distributionWeightsSelector = createSelector(
  distributionStateSelector,
  weightsSelector,
  (distState, weights) => {
    const weightsData = zipWith(
      (weight, trueRate) => ({x: trueRate, y: weight}),
      weights,
      trueRates
    );
    return assoc("weights", weightsData, distState);
  }
);
