/* @flow */
import React, {Component, PropTypes } from 'react';
import NumberEditor from 'react-number-editor';

export default class DebouncedNumberEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value, debouncing: false };
    this.onLocalValueChange = this.onLocalValueChange.bind(this);
  }

  // $FlowIssue
  static propTypes = {
      onValueChange: PropTypes.func.isRequired,
      value: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      step: PropTypes.number.isRequired,
  };

  onLocalValueChange(val: string) {
    const newValue = parseInt(val);
    const {min, max} = this.props;
    if (newValue === this.state.value) return;
    if (newValue < min) return;
    if (newValue > max) return;
    this.setState({value: newValue});
    if (this.state.debouncing) return;
    this.setState({debouncing: true});
    setTimeout(() => {
      this.props.onValueChange(this.state.value);
      this.setState({debouncing: false})
    }, 100);
  }

  render(): any {
    const { onValueChange, min, max, label, step } = this.props;
    return (<NumberEditor
              step={step}
              onValueChange={this.onLocalValueChange}
              value={this.state.value}
              min={min}
              max={max}
              style={{width: "2.5em"}}
              label={label}
           />);
  }

}
