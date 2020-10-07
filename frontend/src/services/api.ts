import axios from 'axios';

const api = axios.create({
  baseURL: 'http://e09c3b007f62.ngrok.io',
});

export default api;
