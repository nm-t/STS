/* @flow */

import React, { Component } from 'react';
import StageContainer from './StageContainer';
import GraphContainer from './GraphContainer';
import DistributionContainer from './DistributionContainer';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import AppBar from 'material-ui/lib/app-bar';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import StsTheme from '../theme';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);


if (module.hot) {
  module.hot.accept('../reducers', () =>
      store.replaceReducer(combineReducers(require('../reducers')))
  );
}

export default class App extends Component {
  // $FlowIssue
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext(): any {
    return {
      muiTheme: ThemeManager.getMuiTheme(StsTheme)
    }
  }

  render(): any {
    return (
      <div>
        <AppBar title="Sequential Trial Simulator" />
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-2-5 pure-u-xl-1-5">
            <Provider store={store}>
              <DistributionContainer />
            </Provider>
            <Provider store={store}>
              <StageContainer />
            </Provider>
          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5 pure-u-xl-4-5">
            <Provider store={store} className={{}}>
              <GraphContainer />
            </Provider>
          </div>
        </div>
      </div>
    );
  }
}
