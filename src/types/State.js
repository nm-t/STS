/* @flow */
import Stage from './Stage';

export default class State {
    constructor(stages: Array<Stage>) {
        this.stages = stages;

        /// TODO: Don't use this in prod!
        Object.freeze(this);
    }
    stages: Array<Stage>;
}

