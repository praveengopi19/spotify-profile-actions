import React from 'react'
import { Link } from 'react-router-dom'

function AllPlaylist({ playlists }) {

    return (playlists.length > 0 ?
        <div className="allplaylistContainer">
            {playlists.map((playlist) => {
                return (
                    <Link key={playlist.id} className="innerContainer" to={`/playlist/${playlist.id}`}>
                        <img src={playlist.images.length ? playlist.images[0].url : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"} alt={playlist.name} />
                        <div className="primaryText">{playlist.name}</div>
                        <div className="secondaryText">{playlist.tracks.total} Tracks</div>
                    </Link>
                )
            })}
        </div> : <div className="emptyContent"> No playlist found :(</div>
    )
}

export default AllPlaylist