/* @flow */

export class Uniform {
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.type = "uniform";
  }

  type: string;
  min: number;
  max: number;
}

export class LogitNormal {
  constructor(mu: number, sigma: number) {
    this.mu = mu;
    this.sigma = sigma;
    this.type = "logitNormal";
  }

  type: string;
  mu: number;
  sigma: number;
}

export class Beta {
  constructor(alpha: number, beta: number) {
    this.alpha = alpha;
    this.beta = beta;
    this.type = "beta";
  }

  type: string;
  alpha: number;
  beta: number;
}
