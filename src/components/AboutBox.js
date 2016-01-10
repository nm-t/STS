import React from 'react';
import InfoBox from './InfoBox';

const HowToUseBox = ({open, onRequestClose}) => (
  <InfoBox title="About" open={open} onRequestClose={onRequestClose}>
    <h3>Background</h3>
    Sequential study designs are an important approach in pioneer
    (first-in-human) drug safety and effectiveness research.
    <p/>
    A sequential trial typically includes a number of stages, defined
    by a pre-specified number of individuals who are exposed to a new
    medication or a next higher dose-level of the medication under
    investigation. Depending on the number of individuals who
    experience a certain critical (or beneficial) event at the end of a
    stage, the trial is either stopped for futility or proceeds with
    the next stage (inclusion of further individuals and re-evaluation
    of pre-defined stopping criteria).
    <p/>
    If a substance (or dose) successfully passes all predefined stages
    of the sequential trial, the medication (or dose) is claimed to be
    acceptably safe and/or efficient. 
    <p/>
    This website allows the visualisation of the stochastic properties
    of an arbitrary sequential study, helping investigators design and
    plan first-in-human trials whilst balancing patient safety and
    overall cost-effectiveness.
    <h3>Implementation</h3>
    All code is at <a href="https://github.com/nm-t/sts">https://github.com/nm-t/sts</a>.
    <p/>
    This application was initially implemented over three days for Health Hack 2015 by <b>Alex</b>, <b>Joash</b>, <b>Louis</b>, <b>Nathalia</b>, and <b>Nathan</b> for the problem owner <b>Dr. Tibor Schuster</b> of the Murdoch Childrens Research Institute, Melbourne Children's Trials Centre.
    <p/>
    The initial implementation used nvd3, d3.js, Bootstrap, AngularJS, and jstat.
    <p/>
    It was later completely reimplemented by <b>Joash</b> using React, Redux, reselect, redux-undo, nvd3, Material UI, jstat and react-number-editor.
  </InfoBox>
);

export default HowToUseBox;
