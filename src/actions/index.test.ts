import { SET_DATA, fetchData, failWithDefaultHandler, SHOW_ERROR } from './types';

import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './index';
import Api from '../services/api';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

jest.mock('../services/api');

function mockStore(...args: any[]) {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const middlewares = [epicMiddleware];
  const mockStore = configureStore(middlewares);
  return mockStore(...args);
}

describe('project actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('tests something', async () => {
    const store = mockStore();
    Api.getData.mockImplementation(() => of('i got the data'));

    store.dispatch(fetchData());
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(4);
    expect(dispatched[2]).toEqual({ type: SET_DATA, data: 'i got the data' });
  });

  it('tests something else', async () => {
    const store = mockStore();
    Api.failedCall.mockImplementation(() => _throw('something bad'));

    store.dispatch(failWithDefaultHandler());
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(4);
    expect(dispatched[2]).toEqual({ type: SHOW_ERROR, data: `i've parsed the error: someting bad` });
  });
});
