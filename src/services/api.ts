import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://global-solution-java-rm561497.azurewebsites.net',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@ClyvoPet:token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;