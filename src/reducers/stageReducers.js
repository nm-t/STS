/* @flow */
import { ADD_STAGE, UPDATE_STAGE, REMOVE_STAGE } from '../actions/ActionTypes';
import Stage from '../classes/Stage';
import State from '../classes/State';
import Action from '../actions/Action';
import update from 'ramda/src/update';

const initialState = new State([new Stage(10, 5), new Stage(20, 15)]);

export default function stageReducers(state = initialState, action: Action): State {
   switch(action.type) {
     case UPDATE_STAGE:
       const {stage} = action;
       const newStage = stage.participants < stage.threshold ? new Stage(stage.participants, stage.participants) : stage;
       return new State(update(action.index, newStage, state.stages));
     default:
       console.log(action);
       return state;
   }
}
