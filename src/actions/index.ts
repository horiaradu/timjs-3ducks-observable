import { Api } from '../services/api';
import * as types from './types';

import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/operators/concat';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { merge } from 'rxjs/observable/merge';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { catchError } from 'rxjs/operators/catchError';

import { ActionsObservable } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  setData,
  fetchStart,
  fetchEnd,
  RootAction,
  FetchData,
  FailWithDefaultHandler,
  FailWithCustomHandler,
  Search,
  setSearchResults,
} from './types';
import { RootState } from '../reducers';
import { Store } from 'react-redux';

const fetchSomeData = (
  action$: ActionsObservable<RootAction>,
  store: Store<RootState>,
  { api }: { api: Api },
): Observable<RootAction> =>
  action$
    .ofType<FetchData>(types.FETCH_DATA)
    .pipe(
      switchMap(() =>
        merge(
          of(fetchStart()),
          api
            .getData()
            .pipe(
              map(result => setData(result)),
              catchError(error => api.requestErrorHandler(error)),
              concat(of(fetchEnd())),
            ),
        ),
      ),
    );

const failWithDefaultHandler = (
  action$: ActionsObservable<RootAction>,
  store: Store<RootState>,
  { api }: { api: Api },
): Observable<RootAction> =>
  action$
    .ofType<FailWithDefaultHandler>(types.FAIL_WITH_DEFAULT_HANDLER)
    .pipe(
      switchMap(() =>
        merge(
          of(fetchStart()),
          api
            .failedCall()
            .pipe(
              map(result => setData(result)),
              catchError(error => api.requestErrorHandler(error)),
              concat(of(fetchEnd())),
            ),
        ),
      ),
    );

const failWithCustomHandler = (
  action$: ActionsObservable<RootAction>,
  store: Store<RootState>,
  { api }: { api: Api },
): Observable<RootAction> =>
  action$.ofType<FailWithCustomHandler>(types.FAIL_WITH_CUSTOM_HANDLER).pipe(
    switchMap(() =>
      merge(
        of(fetchStart()),
        api.failedCall().pipe(
          map(result => setData(result)),
          concat(of(fetchEnd())),
          catchError((error: Error) => {
            console.log('I caught an error and now I am handling it very custom');
            return of(fetchEnd());
          }),
        ),
      ),
    ),
  );

const search = (
  action$: ActionsObservable<RootAction>,
  store: Store<RootState>,
  { api }: { api: Api },
): Observable<RootAction> =>
  action$
    .ofType<Search>(types.SEARCH)
    .pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(({ term }) => api.search(term).pipe(map((results: string[]) => setSearchResults(results)))),
    );

export default combineEpics(fetchSomeData, failWithDefaultHandler, failWithCustomHandler, search);
