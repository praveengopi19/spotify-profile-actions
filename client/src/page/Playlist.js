import React, { Component } from 'react'

import AllTracks from '../components/AllTracks'
import AudioFeatures from '../components/AudioFeatures'
import Loader from '../components/Loader'

import { getPlaylist, getAudioFeaturesForTracks } from '../Spotify/index'

class Playlist extends Component {
    state = {
        playlist: null,
        audioFeatures: null,
        invalidId: false
    }

    async componentDidMount() {
        const tempPlaylist = await getPlaylist(this.props.match.params.id)
        if (tempPlaylist == "invalid playlist id") {
            return this.setState({ invalidId: true })
        }
        this.setState({ playlist: tempPlaylist })
        if (tempPlaylist.tracks.items.length) {
            const audioFeatures = await getAudioFeaturesForTracks(tempPlaylist.tracks.items)
            this.setState({ audioFeatures })
        }
    }


    render() {
        return (
            <>
                {this.state.playlist ? (
                    <div className="playlistIndividual">
                        <div className="playlistIndividual_details">
                            <img src={this.state.playlist.images.length ? this.state.playlist.images[0].url : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"} />
                            <h2>{this.state.playlist.name}</h2>
                            <div className="secondaryText">By {this.state.playlist.owner.display_name}</div>
                            {this.state.playlist.description && <div className="secondaryText">{this.state.playlist.description}</div>}
                            <div className="primaryText">{this.state.playlist.tracks.total} Tracks</div>
                            <a className="linkClass" target="_blank" href={this.state.playlist.external_urls.spotify}>
                                <button className="btn-primary">OPEN ON SPOTIFY</button>
                            </a>
                            <div style={{ marginTop: "20px" }}>
                                {this.state.audioFeatures && this.state.playlist.tracks.items.length && <AudioFeatures audioFeatures={this.state.audioFeatures} />}
                            </div>
                        </div>
                        <div className="playlistIndividual_tracks"  >
                            <AllTracks items={this.state.playlist.tracks.items} from="playlist" />
                        </div>
                    </div>
                ) : this.state.invalidId ? <div className="emptyContent"> No Playlist found at the given URL</div> : <Loader />}
            </>
        )
    }
}

export default Playlist