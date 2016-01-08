/* @flow */
import { DistParamDefinition, Distribution } from './Distributions';

export class Uniform extends Distribution {
  constructor() {
    super("Uniform", [
      new DistParamDefinition({
        paramProp: 'min',
        displayName: 'Min',
        precision: 2,
        min: 0,
        max: 1,
        constrainMaxParam: 'max',
        defaultVal: 0
      }),
      new DistParamDefinition({
        paramProp: 'max',
        displayName: 'Max',
        precision: 2,
        min: 0,
        max: 1,
        constrainMinParam: 'min',
        defaultVal: 1
      })
    ]);
  }

  min: number;
  max: number;
}

export class LogitNormal extends Distribution {
  constructor() {
    super("LogitNormal", [
      new DistParamDefinition({
        paramProp: 'mu',
        displayName: 'μ',
        precision: 2,
        min: -Infinity,
        max: Infinity,
        defaultVal: 0
      }),
      new DistParamDefinition({
        paramProp: 'sigma',
        displayName: 'σ',
        precision: 2,
        min: -Infinity,
        max: Infinity,
        defaultVal: 0.5
      })
    ]);
  }

  mu: number;
  sigma: number;
}

export class Beta extends Distribution {
  constructor() {
    super("Beta", [
      new DistParamDefinition({
        paramProp: 'alpha',
        displayName: 'α',
        precision: 2,
        min: 0.001,
        max: Infinity,
        defaultVal: 2
      }),
      new DistParamDefinition({
        paramProp: 'beta',
        displayName: 'β',
        precision: 2,
        min: 0.001,
        max: Infinity,
        defaultVal: 2
      })
    ]);
  }

  alpha: number;
  beta: number;
}
