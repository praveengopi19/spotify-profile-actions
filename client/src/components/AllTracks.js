import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AllTracks extends Component {

    formatTime(millisecond) {
        let min = (millisecond / 60000).toFixed(2) + ''
        return min.replace('.', ':')
    }

    render() {
        return (
            <div className="inner">
                <h2 className="heading">Recently Played Tracks</h2>
                {this.props.items.map(({ track }, i) => {
                    return (
                        <Link className="linkClass" to={`/track/${track.id}`}>
                            <div className="tracksIndividual" key={i}>
                                <img src={track.album.images[2].url} alt={track.name} />
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
                                <div className="tracksDuration">{this.formatTime(track.duration_ms)}</div>
                            </div>
                        </Link>)
                })
                }
            </div>
        )
    }
}

export default AllTracks