import React from 'react'
import { Link } from 'react-router-dom'

function AllArtist({ artists }) {
    return (
        artists.length > 0 ?
            <div className="allplaylistContainer">
                {artists.map((artist) => {
                    return (
                        <Link key={artist.id} className="innerContainer linkClass" to={`/artist/${artist.id}`}>
                            <img className="artistsAllImage" src={artist.images[1].url} alt={artist.name} />
                            <div className="primaryText">{artist.name}</div>
                        </Link>
                    )
                })}
            </div> : <div className="emptyContent"> No Artist found :(</div>
    )
}

export default AllArtist