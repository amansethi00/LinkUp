import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://link-list.amansethi00.repl.co',
});

api.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const sessionToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    // if (sessionToken && request.headers && username) {
    request.headers['authorization'] = sessionToken;
    request.headers['X-USER-NAME'] = username;
    // }
    return request;
  },
  (reject) => Promise.reject(reject)
);

api.interceptors.response.use(
  (response: AxiosRequestConfig) => response,
  (rejected: AxiosError) => {
    if (rejected.response?.status === 401) {
      //   store.dispatch({ type: 'PURGE_ALL_REQUEST' });
    }
    return Promise.reject(rejected);
  }
);

export default api;
