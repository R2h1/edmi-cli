import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://edmitest.com:7000',
  timeout: 5000
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default instance;
