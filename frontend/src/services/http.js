/* eslint-disable max-len */
import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const http = {
  post: axiosInstance.post,
  get: axiosInstance.get,
};
