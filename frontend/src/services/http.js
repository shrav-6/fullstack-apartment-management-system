/* eslint-disable max-len */
import axios from 'axios';

const token = JSON.parse(sessionStorage.getItem('userCred'))?.token;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
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
