import Api from '../services/api';
import * as types from './types';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';

export interface SetData {
  type: string;
  data: string;
}

export interface ShowError {
  type: string;
  msg: string;
}

export type RootAction = SetData | ShowError | { type: string };

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
      return result;
    } catch (error) {
      console.log('I caught an error and now I am handling it very custom: ' + error.message);
    } finally {
      dispatch({ type: types.FETCH_END });
    }
  };
};

export const showError = (errorMessage: string) => ({ type: types.SHOW_ERROR, msg: errorMessage });
