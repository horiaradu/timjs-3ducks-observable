import store from '../store';
import { showError } from '../actions';

class Api {
  ignoreErrorHandling = false;

  static requestErrorHandler(error: Error) {
    const customError = `i've parsed the error: ${error.message}`;
    store.dispatch(showError(customError));
    return null;
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

  setIgnoreErrorHandling(value: boolean) {
    this.ignoreErrorHandling = value;
    return this;
  }

  getData() {
    const promise = new Promise<string>((resolve, reject) => setTimeout(() => resolve('i got the data'), 500));
    if (this.ignoreErrorHandling) {
      return promise;
    }
    return promise.catch(Api.requestErrorHandler);
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
    return promise.catch(Api.requestErrorHandler);
  }

  failedCall() {
    const promise = new Promise<string>((resolve, reject) => setTimeout(() => reject(new Error('fail')), 500));
    if (this.ignoreErrorHandling) {
      return promise;
    }
    return promise.catch(Api.requestErrorHandler);
  }
}

export default Api;
