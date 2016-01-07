/* @flow */
import Stage from './Stage';

export default class State {
    constructor(stages: Array<Stage>) {
        this.stages = stages;
    }
    stages: Array<Stage>;
}
