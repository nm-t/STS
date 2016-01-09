/* @flow */
import { createSelector } from 'reselect';
import { flatten, aperture, zipWith, assoc, concat, sort, lt, scan, add, compose, map, curry, range } from 'ramda';
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
  return rates;
};

const setQuality = q => {
  // Let's only use multiples of 10
  const interpolateVal = Math.ceil(q / 10);
  const minMaxes = aperture(2, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  const interpolations = map(minMax => (interpolateRates(minMax[0], minMax[1], interpolateVal)), minMaxes);
  return flatten([interpolations, 1]);
};

const log = (x) => { console.log(x); return x; };
console.log(setQuality(30));

// Hardcoding this for now, can make this configurable in future.
export const trueRates = setQuality(100);

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
