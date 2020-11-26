import axios from 'axios'

export const setAssessToken = (token) => localStorage.setItem('Spotify_accessToken', token)

export const getAssessToken = () => localStorage.getItem('Spotify_accessToken')

export const setRefreshToken = (token) => localStorage.setItem('Spotify_refreshToken', token)

export const getRefreshToken = () => localStorage.getItem('Spotify_refreshToken')

const headers = {
    Authorization: `Bearer ${getAssessToken()}`,
    'Content-Type': 'application/json',
};

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

export const getRefreshedAccessToken = () => { axios.get('http://localhost:5000/getRefreshToken') }

export const getUser = () => { axios.get('https://api.spotify.com/v1/me') }

export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist')

export const getAllPlaylist = () => { axios.get('https://api.spotify.com/v1/me/playlists') }

export const getAllArtist = (period) => { axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${period}`) }

export const getAllTracks = (period) => { axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${period}`) }

export const getRecent = async () => {
    const { data } = await axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers })
    console.log(data)
    return data
}

export const getArtist = (id) => { axios.get(`https://api.spotify.com/v1/artists/${id}`) }

export const getTrack = (id) => { axios.get(`https://api.spotify.com/v1/tracks/${id}`) }

export const getPlaylist = (id) => { axios.get(`https://api.spotify.com/v1/playlists/${id}`) }

export const getAudioAnalysis = (id) => { axios.get(`https://api.spotify.com/v1/audio-analysis/${id}`) }

export const getAudioTrackFeatures = (id) => { axios.get(`https://api.spotify.com/v1/audio-features/${id}`) }



