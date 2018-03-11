import { SET_DATA, fetchData, failWithDefaultHandler } from './types';

import configureStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './index';

function mockStore(...args: any[]) {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const middlewares = [epicMiddleware];
  const mockStore = configureStore(middlewares);
  return mockStore(...args);
}

describe('project actions', () => {
  it('tests something', async () => {
    const store = mockStore();
    const res = await store.dispatch(fetchData());
    expect(res).toEqual('i got the data');
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(3);
    expect(dispatched[1]).toEqual({ type: SET_DATA, data: res });
  });

  it('tests something else', async () => {
    const store = mockStore();
    const res = await store.dispatch(failWithDefaultHandler());
    expect(res).toEqual(null);
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(3);
    expect(dispatched[1]).toEqual({ type: SET_DATA, data: res });
  });
});
