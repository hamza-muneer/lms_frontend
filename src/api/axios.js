import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lms-production-726b.up.railway.app/api',
    // baseURL: 'http:127.0.0.1:8000/api',
   headers: { 'Content-Type': 'application/json' },
});

export default api;
