import Api from '../services/api';
import * as types from './types';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';

export interface SetData {
  type: string;
  data: string;
}

export type RootAction = SetData | { type: string };

export const fetchSomeData = () => {
  return async (dispatch: Dispatch<RootState>) => {
    dispatch({ type: types.FETCH_START });
    const result = await Api.getData();
    dispatch({ type: types.SET_DATA, data: result });
    dispatch({ type: types.FETCH_END });
    return result;
  };
};
