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
    window.location = "/"
}


export const getAuthToken = async (token) => {
    try {
        let { data } = await axios.put(`/getAuthToken?token=${token}`)
        setAssessToken(data["access_token"])
        setRefreshToken(data["refresh_token"])
        return getRefreshToken()
    } catch (e) {
        return "Server error"
    }
}


export const getRefreshedAccessToken = async () => {
    try {
        const { data } = await axios.get(`/getRefreshedAccessToken?refreshToken=${getRefreshToken()}`)
        const { access_token } = data
        setAssessToken(access_token)
        return access_token
    }
    catch (e) {
        return "server error"
    }
}
export const getUser = async () => {
    try {
        const { data } = await axiosApi.get('https://api.spotify.com/v1/me')
        return data
    }
    catch (e) {
        return "server error"
    }
}

export const getFollowing = async () => {
    try {
        const { data } = await axiosApi.get('https://api.spotify.com/v1/me/following?type=artist')
        return data
    }
    catch (e) {
        return "server error"
    }
}


export const getAllPlaylist = async () => {
    try {
        const { data } = await axiosApi.get('https://api.spotify.com/v1/me/playlists')
        return data
    }
    catch (e) {
        return "server error"
    }
}


export const getAllArtist = async (period, limit = 50) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${period}`)
        return data
    }
    catch (e) {
        return "server error"
    }
}


export const getAllTracks = async (period, limit = 50) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${period}`)
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

export const getArtist = async (id) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/artists/${id}`)
        return data
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}

export const getTrack = async (id) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/tracks/${id}`)
        return data
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}

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
        //console.log(data)
        return data
    }
    catch (e) {
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}



const getTrackIds = (tracks) => tracks.map(({ track }) => track.id).join(',');

export const audioFeatures_forProgress = (audio_features, tracks_length = 1) => {
    const audioFeatures = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        speechiness: 0,
        valence: 0
    }

    audio_features.map(({ acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence }) => {
        audioFeatures["acousticness"] += acousticness
        audioFeatures["danceability"] += danceability
        audioFeatures["energy"] += energy
        audioFeatures["instrumentalness"] += instrumentalness
        audioFeatures["liveness"] += liveness
        audioFeatures["speechiness"] += speechiness
        audioFeatures["valence"] += valence
    })


    for (const [key, value] of Object.entries(audioFeatures)) {
        audioFeatures[`${key}`] = (value / tracks_length * 100).toFixed(0)
    }

    return audioFeatures

}

export const getAudioFeaturesForTracks = async tracks => {
    try {

        const ids = getTrackIds(tracks);
        //console.log(ids)
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`)

        const audioFeatures = audioFeatures_forProgress(data.audio_features, tracks.length)

        return audioFeatures
    }
    catch (e) {
        console.error(e)
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
};


export const getAudioTrackFeatures = async (id) => {
    try {
        const { data } = await axiosApi.get(`https://api.spotify.com/v1/audio-features/${id}`)
        // console.log(data)
        return data
    }
    catch (e) {
        console.error(e)
        window.location = ("http://localhost:3000/error");
        return "server error"
    }
}



