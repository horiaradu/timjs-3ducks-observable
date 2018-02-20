import Api from '../services/api';
import * as types from './types';
import { Dispatch } from 'redux';

export const fetchSomeData = () => {
  return async (dispatch: Dispatch<{}>) => {
    const result = await Api.getData();
    dispatch({ type: types.SET_DATA, data: result });
    return result;
  };
};
