/* @flow */
import { createSelector } from 'reselect';
import aperture from 'ramda/src/aperture';
import compose from 'ramda/src/compose';
import head from 'ramda/src/head';
import tail from 'ramda/src/tail';
import cond from 'ramda/src/cond';
import of from 'ramda/src/of';
import always from 'ramda/src/always';
import curry from 'ramda/src/curry';

const stagesSelector = state => state.stages;

const middleConstraints = compose(
  (aperture) => {
    const [prev, curr, next] = aperture;
    const incThreshold = prev.threshold + 1;
    return {
      stage: curr,
      minThreshold: incThreshold < curr.participants ? incThreshold : curr.participants,
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
  maxParticipants: stage.participants + 10
});

const headConstraint = compose(
  (aperture) => {
    const [curr, next] = aperture;
    return {
      stage: curr,
      minThreshold: 0,
      minParticipants: 1,
      maxThreshold: curr.participants,
      maxParticipants: next.participants
    };
  },
  head,
  aperture(2)
);

const tailConstraint = compose(
  (aperture) => {
    const [prev, curr] = aperture;
    const incThreshold = prev.threshold + 1;
    return {
      stage: curr,
      minThreshold: incThreshold < curr.participants ? incThreshold : curr.participants,
      minParticipants: prev.participants,
      maxThreshold: curr.participants,
      maxParticipants: curr.participants + 10
    };
  },
  tail,
  aperture(2)
);

const lengthIs = curry(
  (len, xs) => (xs.length === len)
);

const constrainedStagesSelector = createSelector(
  stagesSelector,
  cond([
    [lengthIs(0), always([])],
    [lengthIs(1), compose(singletonConstraint, of)],
    [lengthIs(2), xs => [headConstraint(xs), tailConstraint(xs)]],
    [() => true, xs => [headConstraint(xs), middleConstraints(xs), tailConstraint(xs)]]
  ])
);
