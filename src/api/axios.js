import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lms-production-726b.up.railway.app/api', 
  headers: { 'Content-Type': 'application/json' },
});

export default api;
