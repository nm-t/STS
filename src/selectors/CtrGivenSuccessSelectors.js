/* @flow */
import { createSelector } from 'reselect';
import { reverse, divide, sum, multiply, zipWith, prop, flip, reduce, compose, map, curry, range } from 'ramda';
import { graphDataSelector } from './GraphSelectors';
import { cumulative, weightsSelector, trueRates, round } from './WeightSelectors';


const weightedPassRatesSelector = createSelector(
  graphDataSelector,
  weightsSelector,
  (graphData, weights) => {
    const passRates = map(prop('passRate'), graphData.ctrGraphData);
    return zipWith(multiply, passRates, weights);
  }
);

const bayesCtrGivenSDenomSelector = createSelector(weightedPassRatesSelector, sum);

export const ctrGivenSuccessSelector = createSelector(
  weightedPassRatesSelector,
  bayesCtrGivenSDenomSelector,
  (weightedPassRates, denom) => {
    const ctrGivenSuccess = cumulative(map(flip(divide)(denom), weightedPassRates));
    return {
      ctrGivenSuccess: zipWith(
        (ctr, trueRate) => ({trGivenS: round(ctr), trueRate: round(trueRate)}),
        ctrGivenSuccess,
        trueRates)
    };
  }
);
