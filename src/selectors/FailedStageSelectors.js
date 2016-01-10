/* @flow */
import { createSelector } from 'reselect';
import { transpose, divide, sum, prop, compose, map, zip, range } from 'ramda';
import { graphDataSelector } from './GraphSelectors';
import { cumulative, weightsSelector, trueRates, round } from './WeightSelectors';

export const failRateByStageSelector = createSelector(
  graphDataSelector,
  (graphData) => {
    return { failRatesByStage:
      compose(
        transpose,
        map(row => {
          const failRates = [...row.failRateByStage, row.passRate];
          return map(failRate => ({ failRate, trueRate: round(row.trueRate) }), failRates);
        })
      )
      (graphData.ctrGraphData)
    };
  }
);

