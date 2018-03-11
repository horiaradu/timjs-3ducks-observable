import { createAction } from 'typesafe-actions';

export type Action<T> = { type: T };
export type SetData = Action<typeof SET_DATA> & { data: string };

export type ShowError = Action<typeof SHOW_ERROR> & { msg: string };

export type FetchStart = Action<typeof FETCH_START>;
export type FetchEnd = Action<typeof FETCH_END>;

export type SetSearchResults = Action<typeof SET_SEARCH_RESULTS> & { results: string[] };
export type RootAction = SetData | ShowError | FetchStart | FetchEnd | SetSearchResults;

export const SET_DATA = 'SET_DATA';
export const FETCH_START = 'FETCH_START';
export const FETCH_END = 'FETCH_END';
export const SHOW_ERROR = 'SHOW_ERROR';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export const setData = createAction(SET_DATA, (data: string) => ({ type: SET_DATA, data }));
export const fetchStart = createAction(FETCH_START);
export const fetchEnd = createAction(FETCH_END);
export const showError = createAction(SHOW_ERROR, (msg: string) => ({ type: SHOW_ERROR, msg }));
export const setSearchResults = createAction(SET_SEARCH_RESULTS, (results: string[]) => ({
  type: SET_SEARCH_RESULTS,
  results,
}));
