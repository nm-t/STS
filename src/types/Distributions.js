/* @flow */

export class DistParamDefinition {
  constructor(definition: any) {
    const {
      paramProp,
      displayName,
      defaultVal,
      precision,
      min,
      max,
      constrainMaxParam,
      constrainMinParam
    } = definition;
    this.paramProp = paramProp;
    this.displayName = displayName;
    this.precision = precision;
    this.min = min;
    this.max = max;
    this.constrainMinParam = constrainMinParam;
    this.constrainMaxParam = constrainMaxParam;
    this.defaultVal = defaultVal;
  };

  paramProp: string;
  displayName: string;
  precision: number;
  min: number;
  max: number;
  defaultVal: number;
  constrainMaxParam: string;
  constrainMinParam: string;
}

export class Distribution {
  constructor(type: string, paramDefs: Array<DistParamDefinition>, sampleFunc: (dist: Distribution, val: number) => number) {
    this.type = type;
    this.paramDefinitions = paramDefs;
    this.sampleFunc = sampleFunc;
    paramDefs.forEach(paramDef => {
      // $FlowIssue: https://github.com/facebook/flow/issues/103
      this[paramDef.paramProp] = paramDef.defaultVal;
    });
  }

  paramDefinitions: Array<DistParamDefinition>;
  type: string;
  sampleFunc: (dist: Distribution, val: number) => number;
}
