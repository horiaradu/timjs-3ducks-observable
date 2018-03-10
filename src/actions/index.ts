import Api from '../services/api';
import * as types from './types';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';

export type Action<T> = { type: T };
export type SetData = Action<typeof types.SET_DATA> & { data: string };
export type ShowError = Action<typeof types.SHOW_ERROR> & { msg: string };
export type FetchStart = Action<typeof types.FETCH_START>;
export type FetchEnd = Action<typeof types.FETCH_END>;
export type SetSearchResults = Action<typeof types.SET_SEARCH_RESULTS> & { results: string[] };
export type RootAction = SetData | ShowError | FetchStart | FetchEnd | SetSearchResults;

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

export const search = (term: string) => {
  return async (dispatch: Dispatch<RootState>) => {
    const result = await Api.search(term);
    dispatch({ type: types.SET_SEARCH_RESULTS, data: result });
  };
};
