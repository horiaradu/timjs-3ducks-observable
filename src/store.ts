import { createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';
import rootEpic from './actions/index';
import api from './services/api';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history), createEpicMiddleware(rootEpic, { dependencies: { api } })];

declare var window: { devToolsExtension: () => GenericStoreEnhancer };

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
