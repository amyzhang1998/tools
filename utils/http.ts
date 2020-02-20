import axios from 'axios';
import { isBrowser } from './env';

let host = '';
if (!isBrowser) {
  host = process.env.REMOTE_HOST || 'http://127.0.0.1:7001';
}

const instance = axios.create({
  baseURL: host
});

export default instance;
