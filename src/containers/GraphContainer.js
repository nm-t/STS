/* @flow */
import React, {Component, PropTypes} from 'react';
import { bindActionCreators, mapStateToProps } from 'redux';
import { connect } from 'react-redux';
import { weightsSelector } from '../selectors/WeightSelectors';

class GraphContainer extends Component {
  // $FlowIssue
  static propTypes = {
    weights: PropTypes.array.isRequired
  };

  render(): any {
    const { dispatch } = this.props;
    return (
        <div>Graphs</div>
    );
  }
}

export default connect(weightsSelector)(GraphContainer);
