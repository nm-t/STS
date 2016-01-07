/* @flow */

import React, { Component } from 'react';
import StsApp from './StsApp';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

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
        <Provider store={store}>
          <StsApp />
        </Provider>
      </div>
    );
  }
}
