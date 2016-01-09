/* @flow */
import { createSelector } from 'reselect';
import { divide, sum, multiply, zipWith, prop, flip, reduce, compose, map, curry, range } from 'ramda';
import { graphDataSelector } from './GraphSelectors';
import { cumulative, weightsSelector, trueRates, round } from './WeightSelectors';

const weightedFailRatesSelector = createSelector(
  graphDataSelector,
  weightsSelector,
  (graphData, weights) => {
    const passRates = map(row => (1 - row.passRate), graphData.ctrGraphData);
    return zipWith(multiply, passRates, weights);
  }
);

const bayesCtrGivenFDenomSelector = createSelector(weightedFailRatesSelector, sum);

export const ctrGivenFailureSelector = createSelector(
  weightedFailRatesSelector,
  bayesCtrGivenFDenomSelector,
  (weightedPassRates, denom) => {
    const ctrGivenFailure = cumulative(map(flip(divide)(denom), weightedPassRates));
    return {
      ctrGivenFailure: zipWith(
        (ctr, trueRate) => ({trGivenF: round(ctr), trueRate: round(trueRate)}),
        ctrGivenFailure,
        trueRates
      )
    };
  }
);
