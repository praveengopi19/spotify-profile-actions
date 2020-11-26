import axios from 'axios'
import { getAssessToken, getRefreshedAccessToken, removeTokens } from '../Spotify/index'

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(async config => {
    const accessToken = getAssessToken()
    config.headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    return config;
}, error => {
    Promise.reject(error)
})

axiosApiInstance.interceptors.response.use(response => {
    return response
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.message === "The access token expired" && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAcessToken = await getRefreshedAccessToken()
        originalRequest.headers['Authorization'] = 'Bearer ' + newAcessToken;
        return axiosApiInstance(originalRequest)
    }
    if (error.response.status === 401) {
        removeTokens()
    }
    Promise.reject(error)
})

export default axiosApiInstance