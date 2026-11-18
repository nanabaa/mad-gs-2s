import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://global-solution-java-rm561497.azurewebsites.net/api', 
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@ConectaSocial:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;