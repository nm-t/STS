/* @flow */
import { createSelector } from 'reselect';
import { graphDataSelector } from './GraphSelectors';
import { ctrGivenSuccessSelector } from './CtrGivenSuccessSelectors';
import { ctrGivenFailureSelector } from './CtrGivenFailureSelectors';
import { failRateByStageSelector } from './FailedStageSelectors';

export const combinedGraphSelector = createSelector(
  graphDataSelector,
  ctrGivenSuccessSelector,
  ctrGivenFailureSelector,
  failRateByStageSelector,
  (graphData, ctrGivenSuccess, ctrGivenFailure, failRateByStage) =>
    ({ ...graphData, ...ctrGivenSuccess, ...ctrGivenFailure, ...failRateByStage })
);

