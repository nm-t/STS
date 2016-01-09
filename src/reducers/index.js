import undoable from 'redux-undo';

import stageReducers from './stageReducers';

const undoableStageReducers = undoable(stageReducers);

export { undoableStageReducers as stage };

export { default as propDist } from './priorDistReducers';
