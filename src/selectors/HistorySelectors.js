/* @flow */
import { createSelector } from 'reselect';
import { prop } from 'ramda';

const log = (x) => { console.log(x); return x; };

const propDistSelector = prop('propDist');

export const historySelector = createSelector(
  propDistSelector,
  (history) => {
    return { undoable: history.past.length > 0, redoable: history.future.length > 0 };
  }
);
