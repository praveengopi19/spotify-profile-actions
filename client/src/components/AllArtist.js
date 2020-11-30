import React from 'react'
import { Link } from 'react-router-dom'

function AllArtist({ artists }) {
    return (
        <div className="allplaylistContainer">
            {artists.map((artist) => {
                return (
                    <Link key={artist.id} className="innerContainer linkClass" to={`/artist/${artist.id}`}>
                        <img className="artistsAllImage" src={artist.images[1].url} alt={artist.name} />
                        <div className="primaryText">{artist.name}</div>
                    </Link>
                )
            })}
        </div>
    )
}

export default AllArtist