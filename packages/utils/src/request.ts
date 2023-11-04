import axios from 'axios';
import { printError } from './log';

const instance = axios.create({
  baseURL: 'http://edmitest.com:7000',
  timeout: 5000
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.response;
    printError(error);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      status,
      message: data
    });
  }
);

export default instance;
