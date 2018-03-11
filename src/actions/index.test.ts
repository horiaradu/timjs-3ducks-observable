import * as actions from './index';
import * as types from './types';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('project actions', () => {
  it('tests something', async () => {
    const store = mockStore();
    const res = await store.dispatch(actions.fetchSomeData());
    expect(res).toEqual('i got the data');
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(3);
    expect(dispatched[1]).toEqual({ type: types.SET_DATA, data: res });
  });

  it('tests something else', async () => {
    const store = mockStore();
    const res = await store.dispatch(actions.failWithDefaultHandler());
    expect(res).toEqual(null);
    const dispatched = store.getActions();
    expect(dispatched.length).toEqual(4);
    expect(dispatched[1]).toEqual({ type: types.SHOW_ERROR, msg: "i've parsed the error: fail" });
    expect(dispatched[2]).toEqual({ type: types.SET_DATA, data: res });
  });
});
