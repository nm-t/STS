/* @flow */
import { createSelector } from 'reselect';
import aperture from 'ramda/src/aperture';
import compose from 'ramda/src/compose';
import head from 'ramda/src/head';
import last from 'ramda/src/last';
import cond from 'ramda/src/cond';
import of from 'ramda/src/of';
import always from 'ramda/src/always';
import curry from 'ramda/src/curry';

export const stagesSelector = (state: any): any => state.stage.stages;

const middleConstraints = compose(
  (aperture) => {
    const [prev, curr, next] = aperture;
    const incThreshold = prev.threshold + 1;
    return {
      stage: curr,
      minThreshold: incThreshold,
      minParticipants: prev.participants,
      maxThreshold: curr.participants,
      maxParticipants: next.participants
    };
  },
  aperture(3)
);

const singletonConstraint = stage => ({
  stage: stage,
  minThreshold: 0,
  minParticipants: 1,
  maxThreshold: stage.participants,
  maxParticipants: Infinity
});

const headConstraint = compose(
  (aperture) => {
    const [curr, next] = aperture;
    return {
      stage: curr,
      minThreshold: 0,
      minParticipants: curr.threshold,
      maxThreshold: Math.min(curr.participants, next.threshold-1),
      maxParticipants: next.participants
    };
  },
  head,
  aperture(2)
);

const lastConstraint = compose(
  (aperture) => {
    const [prev, curr] = aperture;
    const incThreshold = prev.threshold + 1;
    return {
      stage: curr,
      minThreshold: incThreshold,
      minParticipants: Math.max(prev.participants, curr.threshold),
      maxThreshold: curr.participants,
      maxParticipants: Infinity
    };
  },
  last,
  aperture(2)
);

const lengthIs = curry((len, xs) => (xs.length === len));

const totalParticipantsSelector = state => {
  return stagesSelector(state).reduce((acc, stage) => (stage.participants > acc ? stage.participants : acc), 0);
}

export const constrainedStagesSelector = createSelector(
  stagesSelector,
  totalParticipantsSelector,
  (stages, totalParticipants) => {
    return {
      stages: cond([
          [lengthIs(0), () => ([])],
          [lengthIs(1), compose(singletonConstraint, of)],
          [lengthIs(2), xs => [headConstraint(xs), lastConstraint(xs)]],
          [() => true, xs => [headConstraint(xs), middleConstraints(xs), lastConstraint(xs)]]
        ])(stages),
      totalParticipants: totalParticipants
    };
  }
);
