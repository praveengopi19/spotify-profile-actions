import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AudioFeatures from '../components/AudioFeatures'
import Loader from '../components/Loader'

import { formatTime } from '../utils/FormatTime';
import { getTrack, getAudioTrackFeatures, getAudioAnalysis, audioFeatures_forProgress } from '../Spotify/index'

class Track extends Component {
    state = {
        track: null,
        audioFeatures: null,
        audioAnalysis: null,
        invalidId: false
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const tempTrack = await getTrack(id)
        if (tempTrack == "invalid id") {
            return this.setState({ invalidId: true })
        }
        if (tempTrack) {
            const tempFeatures = await getAudioTrackFeatures(id)
            const tempAnalysis = await getAudioAnalysis(id)
            this.setState({
                track: tempTrack,
                audioFeatures: tempFeatures,
                audioAnalysis: tempAnalysis
            })
        }
    }

    render() {
        return (<>
            {this.state.track ? (
                <div className="playlistIndividual">
                    <div className="playlistIndividual_details">
                        <img src={this.state.track.album.images.length ? this.state.track.album.images[0].url : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"} />
                        <h2>{this.state.track.name}</h2>
                        {this.state.track.artists && <div className="primaryText">{this.state.track.artists.map(({ name, id }, i) => {
                            return (<span key={id}>
                                <Link className="linkClass" to={`/artist/${id}`}>{name}{this.state.track.artists.length - 1 === i ? ' ' : ','}&nbsp;</Link>
                            </span>)
                        })}</div>}
                        <div className="secondaryText">
                            <a className=" linkClass" target="_blank" href={this.state.track.album.external_urls.spotify}>{this.state.track.album.name}</a>
                            &middot; {this.state.track.album.release_date.substring(0, 4)}
                        </div>
                        <a className="linkClass" target="_blank" href={this.state.track.external_urls.spotify}>
                            <button className="btn-primary">PLAY ON SPOTIFY</button>
                        </a>
                        <div style={{ marginTop: "20px" }}>
                            {this.state.audioFeatures && <AudioFeatures audioFeatures={audioFeatures_forProgress([this.state.audioFeatures])} />}
                        </div>
                    </div>
                    <div className="playlistIndividual_tracks track_individual_right" >
                        <div>
                            <h4>{formatTime(this.state.track.duration_ms)}</h4>
                            <p>Duration</p>
                        </div>
                        <div>
                            <h4>{this.state.audioFeatures.mode === 1 ? 'Major' : 'Minor'}</h4>
                            <p>Modality</p>
                        </div>
                        <div>
                            <h4>{this.state.audioFeatures.time_signature}</h4>
                            <p>Time Signature</p>
                        </div>
                        <div>
                            <h4>{Math.round(this.state.audioFeatures.tempo)}</h4>
                            <p>Tempo (BPM)</p>
                        </div>
                        <div>
                            <h4>{this.state.track.popularity}%</h4>
                            <p>Popularity</p>
                        </div>
                        <div>
                            <h4>{this.state.audioAnalysis.bars.length}</h4>
                            <p>Bars</p>
                        </div>
                        <div>
                            <h4>{this.state.audioAnalysis.beats.length}</h4>
                            <p>Beats</p>
                        </div>
                        <div>
                            <h4>{this.state.audioAnalysis.sections.length}</h4>
                            <p>Sections</p>
                        </div>
                        <div>
                            <h4>{this.state.audioAnalysis.segments.length}</h4>
                            <p>Segments</p>
                        </div>
                        <div>
                            <h4>{this.state.audioAnalysis.tatums.length}</h4>
                            <p>Tatums</p>
                        </div>
                    </div>
                </div>
            ) : this.state.invalidId ? <div className="emptyContent">No Track found at the given url</div> : <Loader />}
        </>)
    }
}

export default Track