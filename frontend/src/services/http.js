/* eslint-disable max-len */
import axios from 'axios';

const token = JSON.parse(sessionStorage.getItem('userCred'))?.token;

const axiosInstance = axios.create({
  baseURL: 'http://172.17.0.237:8074/',
  headers: {
    accessToken: `${token}`,
  },
});

export const http = {
  post: axiosInstance.post,
  get: axiosInstance.get,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};
