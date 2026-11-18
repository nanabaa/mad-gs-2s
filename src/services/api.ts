import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://global-solution-java-rm561497.azurewebsites.net/api', 
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@ConectaSocial:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`REQUISIÇÃO: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  console.log('Body enviado:', config.data);
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => {
    console.log(`RESPOSTA [${response.status}]:`, response.data);
    return response;
  },
  (error) => {
    console.log(`ERRO [${error.response?.status}]:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;