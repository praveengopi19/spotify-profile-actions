import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { formatTime } from '../utils/FormatTime'

class AllTracks extends Component {


    render() {
        return (
            this.props.items.length > 0 ?
                <>
                    {this.props.items.map((track, i) => {
                        if (this.props.from === "recent" || this.props.from === "playlist") {
                            track = track.track
                        }
                        return (
                            <Link key={track.id + i} className="linkClass" to={`/track/${track.id}`}>
                                <div className="tracksIndividual" >
                                    <img src={track.album.images.length ? track.album.images[2].url : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"} alt={track.name} />
                                    <div className="tracksNameAlbum">
                                        <div className="name">{track.name}</div>
                                        <div className="artistalbum">
                                            {track.album.artists.map((artist, i) => {
                                                return (
                                                    <span key={"a" + i}>{artist.name}
                                                        {track.album.artists.length > 0 && i === track.album.artists.length - 1 ? '' : ','}
                                            &nbsp;
                                                    </span>
                                                )
                                            })
                                            }
                               &middot;&nbsp;
                                {track.album.name}
                                        </div>
                                    </div>
                                    <div className="tracksDuration">{formatTime(track.duration_ms)}</div>
                                </div>
                            </Link>)
                    })
                    }
                </> : <><div className="emptyContent"> No Tracks found :(</div></>
        )
    }
}

export default AllTracks
