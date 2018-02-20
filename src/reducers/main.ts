import * as types from '../actions/types';
import { RootAction, SetData, ShowError } from '../actions';

export type MainState = {
  readonly data: string | null;
  readonly loading: boolean;
};

const initialState = {
  data: null,
  loading: false,
};

export default (state = initialState, action: RootAction): MainState => {
  switch (action.type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_END:
      return { ...state, loading: false };
    case types.SET_DATA:
      const data = (action as SetData).data;
      return { ...state, data };
    case types.SHOW_ERROR:
      console.log('a fancy component would display these things generically: ' + (action as ShowError).msg);
      return state;
    default:
      return state;
  }
};
