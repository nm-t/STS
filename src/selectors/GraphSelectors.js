/* @flow */
import { createSelector } from 'reselect';
import { compose, map, curry, range } from 'ramda';
import { jStat } from 'jstat';

export const stagesSelector = (state: any): any => state.stage.stages;

const runSeqTrial = function(stages, trueRate) {
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
    // Initialise the 
    for (let index=previous_cutoff; index < passed_previous.length + stage.numPeople; index++) {
      pass_current[index] = 0.0;
    }

    for (let people=0; people <= stage.numPeople; people++) {
      let affected = jStat.binomial.pdf(people, stage.numPeople, trueRate);
      let previous_length = passed_previous.length;
      for (let index=previous_cutoff; index < previous_length; index++) {
        pass_current[index + people] += passed_previous[index] * affected;
      }
    }

    let failed_at_stage = 0.;
    for (let index=previous_cutoff; index < stage.passThreshold; index++) {
      failed_at_stage += pass_current[index];
    }
    failed_stage[failed_stage.length] = failed_at_stage;
    let average_passed_stage = 0.;

    for (let index=0; index < pass_current.length; index++) {
      average_passed_stage += pass_current[index] * index
    }
    passed_stage[passed_stage.length] = average_passed_stage;

    previous_cutoff = stage.passThreshold;
    passed_previous = pass_current;
    pass_current = pass_current.slice(0, stage.passThreshold);
  });

  let pass = 0.;
  for (let index=previous_cutoff; index < passed_previous.length; index++) {
    pass += passed_previous[index];
  }
  return { trueRate: trueRate, passFraction: pass, numSuccesses: passed_stage, stageFailed: failed_stage };
};

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

export const constrainedStagesSelector = createSelector(
  (stages, totalParticipants) => {
  }
);
