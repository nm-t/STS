import undoable from 'redux-undo';

import stageReducers from './stageReducers';
const undoableStageReducers = undoable(stageReducers);
export { undoableStageReducers as stage };

import priorDistReducers from './priorDistReducers';
const undoablePriorDistReducers = undoable(priorDistReducers);
export { undoablePriorDistReducers as propDist };
