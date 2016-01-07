/* @flow */
import { ADD_STAGE, UPDATE_STAGE, REMOVE_STAGE } from '../actions/ActionTypes';
import Stage from '../classes/Stage';
import State from '../classes/State';
import Action from '../actions/Action';

const initialState = new State([new Stage(10, 5), new Stage(20, 15)]);

export default function stageReducers(state = initialState, action: Action): State {
   switch(action.type) {
     default:
         return state;
   }
}
