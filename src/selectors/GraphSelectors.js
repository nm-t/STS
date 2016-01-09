/* @flow */
import { createSelector } from 'reselect';
import { compose, map, curry, range } from 'ramda';
import { trueRates, round } from './WeightSelectors';
import { nonCumulativeStagesSelector } from './StageSelectors';
import { jStat } from 'jstat';

const runSeqTrial = curry((stages, trueRate) => {
  // passed_previous and pass_current keeps the fraction of trials where i people were affected
  // indexed by i. eg [3] is the probability that exactly 3 people were affected
  // pass_previous keeps the numbers from the previous stage, pass_current is used
  // to calculate the current stage
  let passed_previous = [1.0];
  let pass_current = [];
  let previous_cutoff = 0;
  let failed_stage = [];
  let passed_stage = [];

  stages.forEach(function(stage) {
    // Initialise the probability array
    for (var index=previous_cutoff; index < passed_previous.length + stage.participants; index++) {
      pass_current[index] = 0.0;
    }

    // This outer loop calculates the probability of all possible outcomes of a stage,
    // assuming that it just happened on its own.
    // For example, given a 5 person stage, it will calculate the probability that:
    // 0/5 pass, 1/5 pass, 2/5 pass... 5/5 pass.
    for (let people=0; people <= stage.participants; people++) {
      let affected = jStat.binomial.pdf(people, stage.participants, trueRate);
      let previous_length = passed_previous.length;

      // This inner loop will calculate the probability that the outcome of this stage being calculated was reached,
      // given that the last stage passed.  To do this, we sum together the possible permutations
      // of previous stage outcomes that could have led to this particular outcome.
      // For example, let's assume we are given the stages [{ threshold: 1, people: 2 }, { threshold 2: people 3 }]
      // The probability that 2/3 people passed the second stage is given by (P(1/2) * P(1/3)) + (P(2/2) * P(0/3)).
      for (let index=previous_cutoff; index < previous_length; index++) {
        pass_current[index + people] += passed_previous[index] * affected;
      }
    }

    let failed_at_stage = 0.;
    for (let index=previous_cutoff; index < stage.threshold; index++) {
      failed_at_stage += pass_current[index];
    }
    failed_stage[failed_stage.length] = failed_at_stage;
    let average_passed_stage = 0.;

    for (let index=0; index < pass_current.length; index++) {
      average_passed_stage += pass_current[index] * index
    }
    passed_stage[passed_stage.length] = average_passed_stage;

    previous_cutoff = stage.threshold;
    passed_previous = pass_current;
    pass_current = pass_current.slice(0, stage.threshold);
  });


  let pass = 0.;
  for (let index=previous_cutoff; index < passed_previous.length; index++) {
    pass += passed_previous[index];
  }
  return { passRate: pass, passRateByStage: passed_stage, failRateByStage: failed_stage, trueRate: trueRate };
});

export const graphDataSelector = createSelector(
  nonCumulativeStagesSelector,
  stages => {
    return ({ ctrGraphData: (map(runSeqTrial(stages), trueRates)) })}
);
