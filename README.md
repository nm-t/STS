# STS - Sequential Trial Simulator for Health Hack 2015

http://nm-t.github.io/STS

<h2>About Sequential Trial Simulator</h2>

Sequential study designs are an important approach in pioneer (first-in-human) drug safety and effectiveness research. A sequential trial typically includes a number of stages. Each stage is defined by a pre-specified number of individuals who is exposed to a new medication or a next higher dose-level of the medication under investigation. Depending on the number of individuals who experience a certain critical (or beneficial) event at the end of a stage, the trial is either stopped for futility or proceeds with the next stage (inclusion of further individuals and re-evaluation of pre-defined stopping criteria). If a substance (or dose) successfully passes all predefined stages of the sequential trial, the medication (or dose) is claimed to be acceptably safe and/or efficient. The project targets the development of a tool (online GUI / app) which allows the visualisation of the stochastic properties of an arbitrary sequential study which will help investigators to design and plan first-in-human trials under simultaneous consideration of patient safety and overall cost-effectiveness of the investigation.

<h2>Implementation</h2>

STS is written as a web application using HTML5/CSS(bootstrap) and JavaScript (AngularJS framework and d3 library).

<h2>Usage</h2>

How to use:

1. Add required amount of stages using the "Add Stage" button. Any unwanted stages can be removed later on using the "X" button.
2. Specify number of participants per stage.
3. Determine minimum total number of responses to pass to the next stage. The minimum repsonses to pass should not surpass the total number of participants upto and including the current stage.
