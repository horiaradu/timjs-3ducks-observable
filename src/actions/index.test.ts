import { SET_DATA, fetchData, failWithDefaultHandler, SHOW_ERROR } from './types';

import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './index';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import api from '../services/api';

function mockStore(data: { state: any; dependencies: any }) {
  const { state, dependencies } = data;
  const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });
  const middlewares = [epicMiddleware];
  return configureStore(middlewares)(state);
}

describe('project actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('tests something', async () => {
    const store = mockStore({ state: {}, dependencies: { api: { getData: () => of('i got the data') } } });

    store.dispatch(fetchData());
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(4);
    expect(dispatched[2]).toEqual({ type: SET_DATA, data: 'i got the data' });
  });

  it('tests something else', async () => {
    const store = mockStore({
      state: {},
      dependencies: {
        api: { failedCall: () => _throw(new Error('something bad')), requestErrorHandler: api.requestErrorHandler },
      },
    });

    store.dispatch(failWithDefaultHandler());
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(4);
    expect(dispatched[2]).toEqual({ type: SHOW_ERROR, msg: `i've parsed the error: something bad` });
  });
});
