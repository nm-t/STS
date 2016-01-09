/* @flow */
import { ADD_STAGE, UPDATE_STAGE, REMOVE_STAGE } from '../actions/ActionTypes';
import Stage from '../types/Stage';
import State from '../types/State';
import Action from '../actions/Action';
import update from 'ramda/src/update';
import remove from 'ramda/src/remove';
import last from 'ramda/src/last';

const initialState = new State([new Stage(5, 2), new Stage(10, 4), new Stage(20, 12)]);

export default function stageReducers(state = initialState, action: Action): State {
   switch(action.type) {
     case ADD_STAGE:
       const lastStage = last(state.stages);
       const newThreshold = lastStage.threshold + 1;
       const newStage = new Stage(Math.max(lastStage.participants, newThreshold), newThreshold);
       return new State([...state.stages, newStage]);
     case UPDATE_STAGE:
       const {stage} = action;
       const updatedStage = stage.participants < stage.threshold ? new Stage(stage.participants, stage.participants) : stage;
       return new State(update(action.index, updatedStage, state.stages));
     case REMOVE_STAGE:
       const {index} = action;
       return new State(remove(index, 1, state.stages));
     default:
       return state;
   }
}
