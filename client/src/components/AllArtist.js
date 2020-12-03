import React from 'react'
import { Link } from 'react-router-dom'
import { IconProfile } from './Icons'

function AllArtist({ artists }) {
    console.log(artists)
    return (
        artists.length > 0 ?
            <div className="allplaylistContainer">
                {artists.map((artist, i) => {
                    return (
                        <Link key={artist.id} className="innerContainer linkClass" to={`/artist/${artist.id}`}>
                            {artist.images.length && i != 10 ?
                                <img className="artistsAllImage" src={artist.images[1].url} alt={artist.name} /> :
                                <IconProfile />}
                            <div className="primaryText">{artist.name}</div>
                        </Link>
                    )
                })}
            </div> : <div className="emptyContent"> No Artist found :(</div>
    )
}

export default AllArtist