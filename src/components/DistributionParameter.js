/* @flow */
import React, {Component, PropTypes } from 'react';
import DebouncedNumberEditor from './DebouncedNumberEditor';
import { lensProp, view, set } from 'ramda';

export default class DistributionParameter extends Component {
  constructor (props: any) {
    super(props);
    this.parameterChange = this.parameterChange.bind(this);
    const { paramProp, constrainMinParam, constrainMaxParam } = props.paramDefinition;
    this.paramLens = lensProp(paramProp);
    this.minLens = constrainMinParam ? lensProp(constrainMinParam) : undefined;
    this.maxLens = constrainMaxParam ? lensProp(constrainMaxParam) : undefined;
  }

  // $FlowIssue
  static propTypes = {
    distribution: PropTypes.object.isRequired,
    updateDistribution: PropTypes.func.isRequired,
    paramDefinition: PropTypes.object.isRequired
  };

  parameterChange(newParameter: string) {
    const newValue = parseFloat(newParameter);
    const { distribution, updateDistribution } = this.props;
    const updatedDist = set(this.paramLens, newValue, distribution);
    updateDistribution(updatedDist);
  }

  render(): any {
    const { paramDefinition: { paramProp, displayName, precision, min, max }, distribution }= this.props;
    const step = 1 / Math.pow(10, precision);
    const parameterVal = view(this.paramLens, distribution);
    const minVal = this.minLens ? Math.max(view(this.minLens, distribution) + step, min) : min;
    const maxVal = this.maxLens ? Math.min(view(this.maxLens, distribution) - step, max) : max;
    return (
        <DebouncedNumberEditor
          step={step}
          min={minVal}
          decimals={precision}
          max={maxVal}
          value={parameterVal}
          label={displayName}
          onValueChange={this.parameterChange}
          style={{marginRight:"1em"}}
        />
    );
  }
}
