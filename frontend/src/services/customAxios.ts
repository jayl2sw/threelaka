import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
  baseURL: "localhost:8000/api/v1/",   
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',    
  },
});