import axios from "axios"

const BASE_URL = "http://localhost:3002"

const AxiosInstance = axios.create({baseURL:BASE_URL, withCredentials: true,})

export const userLogin = async(data)=>{
    const response = (await AxiosInstance.post('user/login', data))?.data;
    return response;
}

export const userRegister = async(data)=>{
    const response = (await AxiosInstance.post('user/register', data))?.data;
    return response;
}