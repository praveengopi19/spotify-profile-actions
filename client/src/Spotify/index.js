import axios from 'axios'
import { default as axiosApi } from '../utils/axios'


export const setAssessToken = (token) => localStorage.setItem('Spotify_accessToken', token)

export const getAssessToken = () => localStorage.getItem('Spotify_accessToken')

export const setRefreshToken = (token) => localStorage.setItem('Spotify_refreshToken', token)

export const getRefreshToken = () => localStorage.getItem('Spotify_refreshToken')


// setAssessToken("a")
// setRefreshToken("b")

export const removeTokens = () => {
    localStorage.removeItem('Spotify_accessToken')
    localStorage.removeItem('Spotify_refreshToken')
}


export const getAuthToken = async (token) => {
    try {
        let { data } = await axios.put(`http://localhost:5000/getAuthToken?token=${token}`)
        setAssessToken(data["access_token"])
        setRefreshToken(data["refresh_token"])
        return getRefreshToken()
    } catch (e) {
        return "Server error"
    }
}

export const loginUser = async () => { //await axios.get('http://localhost:5000/login')
    window.location = ("http://localhost:5000/login");
}

export const getRefreshedAccessToken = async () => {
    try {
        const { data } = await axios.get(`http://localhost:5000/getRefreshedAccessToken?refreshToken=${getRefreshToken()}`)
        const { access_token } = data
        setAssessToken(access_token)
        return access_token
    }
    catch (e) {
        return "server error"
    }
}
export const getUser = () => { axiosApi.get('https://api.spotify.com/v1/me') }

export const getFollowing = () => axiosApi.get('https://api.spotify.com/v1/me/following?type=artist')

export const getAllPlaylist = () => { axiosApi.get('https://api.spotify.com/v1/me/playlists') }

export const getAllArtist = (period) => { axiosApi.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${period}`) }

export const getAllTracks = async (period) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${period}`)
        return data
    }
    catch (e) {
        return "server error"
    }
}

export const getRecent = async () => {
    try {
        const { data } = await axiosApi.get('https://api.spotify.com/v1/me/player/recently-played')
        return data
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}

export const getArtist = (id) => { axiosApi.get(`https://api.spotify.com/v1/artists/${id}`) }

export const getTrack = (id) => { axiosApi.get(`https://api.spotify.com/v1/tracks/${id}`) }

export const getPlaylist = (id) => { axiosApi.get(`https://api.spotify.com/v1/playlists/${id}`) }

export const getAudioAnalysis = (id) => { axiosApi.get(`https://api.spotify.com/v1/audio-analysis/${id}`) }

export const getAudioTrackFeatures = (id) => { axiosApi.get(`https://api.spotify.com/v1/audio-features/${id}`) }



