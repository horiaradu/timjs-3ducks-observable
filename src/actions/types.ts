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

export type ConnectToSocket = Action<typeof CONNECT_TO_SOCKET>;
export type DisconnectFromSocket = Action<typeof DISCONNECT_FROM_SOCKET>;
export type ReceiveMessage = Action<typeof RECEIVE_MESSAGE> & { msg: string };
export type SendMessage = Action<typeof SEND_MESSAGE> & { msg: string };
export type RootAction =
  | FetchData
  | SetData
  | FailWithDefaultHandler
  | FailWithCustomHandler
  | ShowError
  | FetchStart
  | FetchEnd
  | Search
  | SetSearchResults
  | ConnectToSocket
  | DisconnectFromSocket
  | ReceiveMessage
  | SendMessage;

export const FETCH_DATA = 'FETCH_DATA';
export const SET_DATA = 'SET_DATA';
export const FAIL_WITH_DEFAULT_HANDLER = 'FAIL_WITH_DEFAULT_HANDLER';
export const FAIL_WITH_CUSTOM_HANDLER = 'FAIL_WITH_CUSTOM_HANDLER';
export const FETCH_START = 'FETCH_START';
export const FETCH_END = 'FETCH_END';
export const SHOW_ERROR = 'SHOW_ERROR';
export const SEARCH = 'SEARCH';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const CONNECT_TO_SOCKET = 'CONNECT_TO_SOCKET';
export const DISCONNECT_FROM_SOCKET = 'DISCONNECT_FROM_SOCKET';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

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
export const connectToSocket = createAction(CONNECT_TO_SOCKET);
export const disconnectFromSocket = createAction(DISCONNECT_FROM_SOCKET);
export const receiveMessage = createAction(RECEIVE_MESSAGE, (msg: string) => ({ type: RECEIVE_MESSAGE, msg }));
export const sendMessage = createAction(SEND_MESSAGE, (msg: string) => ({ type: SEND_MESSAGE, msg }));
