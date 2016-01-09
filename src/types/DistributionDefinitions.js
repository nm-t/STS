/* @flow */
import { DistParamDefinition, Distribution } from './Distributions';
import { curry } from 'ramda';
import { jStat } from 'jstat';

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
    ],
    curry((dist, rate) => {
      if (rate < dist.min || rate > dist.max) return 0.0;
      return 1.0;
    }));
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
    ],
    curry((dist, rate) => {
      if (rate === 0.0 || rate === 1.0) return 0.0;
      const logit = Math.log(rate / (1.0 - rate));
      return jStat.normal.pdf(logit, dist.mu, dist.sigma);
    }));
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
    ],
    curry((dist, rate) => (jStat.beta.pdf(rate, dist.alpha, dist.beta))));
  }

  alpha: number;
  beta: number;
}
