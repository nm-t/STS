/* @flow */
import { createSelector } from 'reselect';
import { graphDataSelector } from './GraphSelectors';
import { ctrGivenSuccessSelector } from './CtrGivenSuccessSelectors';
import { ctrGivenFailureSelector } from './CtrGivenFailureSelectors';

export const combinedGraphSelector = createSelector(
  graphDataSelector,
  ctrGivenSuccessSelector,
  ctrGivenFailureSelector,
  (graphData, ctrGivenSuccess, ctrGivenFailure) =>
    ({ ...graphData, ...ctrGivenSuccess, ...ctrGivenFailure })
);

