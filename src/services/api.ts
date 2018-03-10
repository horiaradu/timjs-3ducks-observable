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
      [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        .map(x => String.fromCharCode(x))
        .join('');

    const promise = new Promise<string[]>((resolve, reject) =>
      setTimeout(() => resolve([word(), word(), word(), word()]), 500),
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
