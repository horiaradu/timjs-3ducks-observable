import * as types from '../actions/types';
import { RootAction } from '../actions';

export type MainState = {
  readonly data: string | null;
  readonly loading: boolean;
  readonly results: string[];
};

const initialState = {
  data: null,
  results: [],
  loading: false,
};

export default (state = initialState, action: RootAction): MainState => {
  switch (action.type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_END:
      return { ...state, loading: false };
    case types.SET_DATA:
      const data = action.data;
      return { ...state, data };
    case types.SHOW_ERROR:
      console.log('a fancy component would display these things generically: ' + action.msg);
      return state;
    case types.SET_SEARCH_RESULTS:
      return { ...state, results: action.results };
    default:
      // const _exhaustive: never = action;
      return state;
  }
};
