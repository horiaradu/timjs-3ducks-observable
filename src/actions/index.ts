import Api from '../services/api';
import * as types from './types';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';

export const fetchSomeData = () => {
  return async (dispatch: Dispatch<RootState>) => {
    dispatch({ type: types.FETCH_START });
    const result = await Api.getData();
    dispatch({ type: types.SET_DATA, data: result });
    dispatch({ type: types.FETCH_END });
    return result;
  };
};

export const failWithDefaultHandler = () => {
  return async (dispatch: Dispatch<RootState>) => {
    dispatch({ type: types.FETCH_START });
    try {
      const result = await Api.failedCall();
      dispatch({ type: types.SET_DATA, data: result });
      return result;
    } finally {
      dispatch({ type: types.FETCH_END });
    }
  };
};

export const failWithCustomHandler = () => {
  return async (dispatch: Dispatch<RootState>) => {
    dispatch({ type: types.FETCH_START });
    try {
      const result = await new Api().setIgnoreErrorHandling(true).failedCall();
      dispatch({ type: types.SET_DATA, data: result });
    } catch (error) {
      console.log('I caught an error and now I am handling it very custom: ' + error.message);
    } finally {
      dispatch({ type: types.FETCH_END });
    }
  };
};

export const showError = (errorMessage: string) => ({ type: types.SHOW_ERROR, msg: errorMessage });

let lastRequestStartTimestamp = Date.now();
export const search = (term: string) => {
  const currentRequestStartTimestamp = Date.now();
  lastRequestStartTimestamp = currentRequestStartTimestamp;

  return async (dispatch: Dispatch<RootState>) => {
    const results = await Api.search(term);

    if (currentRequestStartTimestamp < lastRequestStartTimestamp) {
      console.warn('ignoring response, a newer request has been already sent');
      return;
    }
    dispatch({ type: types.SET_SEARCH_RESULTS, results });
  };
};
