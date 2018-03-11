import { createAction } from 'typesafe-actions';

export type Action<T> = { type: T };
export type FetchData = Action<typeof FETCH_DATA>;
export type SetData = Action<typeof SET_DATA> & { data: string };

export type FailWithDefaultHandler = Action<typeof FAIL_WITH_DEFAULT_HANDLER>;
export type FailWithCustomHandler = Action<typeof FAIL_WITH_CUSTOM_HANDLER>;

export type ShowError = Action<typeof SHOW_ERROR> & { msg: string };

export type FetchStart = Action<typeof FETCH_START>;
export type FetchEnd = Action<typeof FETCH_END>;

export type Search = Action<typeof SEARCH> & { term: string };
export type SetSearchResults = Action<typeof SET_SEARCH_RESULTS> & { results: string[] };
export type RootAction =
  | FetchData
  | SetData
  | FailWithDefaultHandler
  | FailWithCustomHandler
  | ShowError
  | FetchStart
  | FetchEnd
  | Search
  | SetSearchResults;

export const FETCH_DATA = 'FETCH_DATA';
export const SET_DATA = 'SET_DATA';
export const FAIL_WITH_DEFAULT_HANDLER = 'FAIL_WITH_DEFAULT_HANDLER';
export const FAIL_WITH_CUSTOM_HANDLER = 'FAIL_WITH_CUSTOM_HANDLER';
export const FETCH_START = 'FETCH_START';
export const FETCH_END = 'FETCH_END';
export const SHOW_ERROR = 'SHOW_ERROR';
export const SEARCH = 'SEARCH';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export const fetchData = createAction(FETCH_DATA);
export const setData = createAction(SET_DATA, (data: string) => ({ type: SET_DATA, data }));
export const failWithDefaultHandler = createAction(FAIL_WITH_DEFAULT_HANDLER);
export const failWithCustomHandler = createAction(FAIL_WITH_CUSTOM_HANDLER);
export const fetchStart = createAction(FETCH_START);
export const fetchEnd = createAction(FETCH_END);
export const showError = createAction(SHOW_ERROR, (msg: string) => ({ type: SHOW_ERROR, msg }));
export const search = createAction(SEARCH, (term: string) => ({ type: SEARCH, term }));
export const setSearchResults = createAction(SET_SEARCH_RESULTS, (results: string[]) => ({
  type: SET_SEARCH_RESULTS,
  results,
}));
