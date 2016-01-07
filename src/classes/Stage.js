/* @flow */

export default class Stage {
    constructor(participants: number, threshold:number) {
        this.participants = participants;
        this.threshold = threshold;
    }

    participants: number;
    threshold: number;
};
