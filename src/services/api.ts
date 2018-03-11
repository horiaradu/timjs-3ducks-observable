import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { showError, ShowError } from '../actions/types';
import { Observable } from 'rxjs/Observable';

class Api {
  static requestErrorHandler(error: Error): Observable<ShowError> {
    const customError = `i've parsed the error: ${error.message}`;
    return of(showError(customError));
  }

  static getData() {
    return new Api().getData();
  }

  static failedCall() {
    return new Api().failedCall();
  }

  static search(term: string) {
    return new Api().search(term);
  }

  getData() {
    const promise = new Promise<string>((resolve, reject) => setTimeout(() => resolve('i got the data'), 500));
    return fromPromise(promise);
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
    return fromPromise(promise);
  }

  failedCall() {
    const promise = new Promise<string>((resolve, reject) => setTimeout(() => reject(new Error('fail')), 500));
    return fromPromise(promise);
  }
}

export default Api;
