/* eslint-disable max-len */
import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const axiosInstance = axios.create({
  baseURL: 'https://shelter-project.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const http = {
  post: axiosInstance.post,
  get: axiosInstance.get,
};
