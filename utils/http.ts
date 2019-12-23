import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isBrowser } from './env';

let host = '';
if (!isBrowser) {
  if (process.env.REMOTE_HOST) {
    host = process.env.REMOTE_HOST;
  }
}

const instance = axios.create({ 
  baseURL: host
});

export default instance;
