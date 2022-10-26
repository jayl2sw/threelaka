import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL: "http://k7e202.p.ssafy.io/",
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// Interceptors
customAxios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
customAxios.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default customAxios;
