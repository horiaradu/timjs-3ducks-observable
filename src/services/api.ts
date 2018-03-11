import { showError } from '../actions';
import { Dispatch } from 'react-redux';
import { RootAction } from '../actions/types';

export default class Api {
  ignoreErrorHandling = false;
  dispatch: Dispatch<RootAction>;

  constructor(dispatch: Dispatch<RootAction>) {
    this.dispatch = dispatch;
  }

  static requestErrorHandler(dispatch: Dispatch<RootAction>, error: Error) {
    const customError = `i've parsed the error: ${error.message}`;
    dispatch(showError(customError));
    return null;
  }

  setIgnoreErrorHandling(value: boolean) {
    this.ignoreErrorHandling = value;
    return this;
  }

  getData() {
    const promise = new Promise<string>((resolve, reject) => setTimeout(() => resolve('i got the data'), 500));
    if (this.ignoreErrorHandling) {
      return promise;
    }
    return promise.catch(e => Api.requestErrorHandler(this.dispatch, e));
  }

  search(term: string) {
    const word = () =>
      term +
      ' - ' +
      [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        .map(x => ('z'.charCodeAt(0) - 'A'.charCodeAt(0)) * x + 'A'.charCodeAt(0))
        .map(x => String.fromCharCode(x))
        .join('');

    const randomDelay = 500 + Math.random() * 1000;
    const promise = new Promise<string[]>((resolve, reject) =>
      setTimeout(() => resolve([word(), word(), word(), word()]), randomDelay),
    );
    if (this.ignoreErrorHandling) {
      return promise;
    }
    return promise.catch(e => Api.requestErrorHandler(this.dispatch, e));
  }

  failedCall() {
    const promise = new Promise<string>((resolve, reject) => setTimeout(() => reject(new Error('fail')), 500));
    if (this.ignoreErrorHandling) {
      return promise;
    }
    return promise.catch(e => Api.requestErrorHandler(this.dispatch, e));
  }
}
