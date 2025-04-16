import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST } from '../constant/Host';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: HOST.API
    });
    axiosInstance.interceptors.request.use(
        async (config: any) => {
            const token = await AsyncStorage.getItem('token')
            config.headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': contentType,
            };
            return config;
        },
        err => Promise.reject(err),
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err),
    );
    return axiosInstance;
};

export default AxiosInstance;
