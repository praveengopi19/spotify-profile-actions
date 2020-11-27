import React from 'react'
import { Link } from 'react-router-dom'

function AllPlaylist({ playlists }) {

    return (
        <div className="allplaylistContainer">
            {playlists.map((playlist) => {
                return (
                    <Link className="innerContainer" to={`/playlist/${playlist.id}`}>
                        <img src={playlist.images.length ? playlist.images[0].url : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"} alt={playlist.name} />
                        <div className="primaryText">{playlist.name}</div>
                        <div className="secondaryText">{playlist.tracks.total} Tracks</div>
                    </Link>
                )
            })}
        </div>
    )
}

export default AllPlaylist