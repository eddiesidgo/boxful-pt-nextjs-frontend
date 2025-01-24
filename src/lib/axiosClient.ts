import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('access_token'); 
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
