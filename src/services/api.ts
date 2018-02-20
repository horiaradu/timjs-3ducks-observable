class Api {
  static getData() {
    return new Promise((resolve, reject) => setTimeout(() => resolve('i got the data'), 500));
  }
}

export default Api;
