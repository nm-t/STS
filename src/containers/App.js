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
  render(): any {
    return (
      <div>
        <AppBar title="Sequential Trial Simulator" />
        <div className="pure-g">
          <div className="pure-u-1-3">
            <Provider store={store}>
              <DistributionContainer />
            </Provider>
            <Provider store={store}>
              <StageContainer />
            </Provider>
          </div>
          <div className="pure-u-2-3">
            <Provider store={store} className={{}}>
              <GraphContainer />
            </Provider>
          </div>
        </div>
      </div>
    );
  }
}
