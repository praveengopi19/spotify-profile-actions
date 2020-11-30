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


export const getAllPlaylist = async () => {
    try {
        const { data } = await axiosApi.get('https://api.spotify.com/v1/me/playlists')
        return data
    }
    catch (e) {
        return "server error"
    }
}


export const getAllArtist = async (period) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${period}`)
        return data
    }
    catch (e) {
        return "server error"
    }
}


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

export const getPlaylist = async (id) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/playlists/${id}`)
        return data
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}


export const getAudioAnalysis = async (id) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/audio-analysis/${id}`)
        return data
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}

const getTrackIds = (tracks) => tracks.map(({ track }) => track.id).join(',');


export const getAudioFeaturesForTracks = async tracks => {
    try {

        const ids = getTrackIds(tracks);
        //console.log(ids)
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`)

        const audioFeatures = {
            acousticness: 0,
            danceability: 0,
            energy: 0,
            instrumentalness: 0,
            liveness: 0,
            speechiness: 0,
            valence: 0
        }



        data.audio_features.map(({ acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence }) => {
            audioFeatures["acousticness"] += acousticness
            audioFeatures["danceability"] += danceability
            audioFeatures["energy"] += energy
            audioFeatures["instrumentalness"] += instrumentalness
            audioFeatures["liveness"] += liveness
            audioFeatures["speechiness"] += speechiness
            audioFeatures["valence"] += valence
        })

        for (const [key, value] of Object.entries(audioFeatures)) {
            audioFeatures[`${key}`] = (value / tracks.length * 100).toFixed(0)
        }


        return audioFeatures
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
};

export const getAudioTrackFeatures = (id) => { axiosApi.get(`https://api.spotify.com/v1/audio-features/${id}`) }



