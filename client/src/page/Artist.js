import React, { Component } from 'react'
import Loader from '../components/Loader'
import { uppercaseFirstLetter } from '../utils/UppercaseFirstLetter'

import { numberWithComa } from '../utils/NumbersWithComa'

import { getArtist } from '../Spotify/index';
import { IconProfile } from '../components/Icons';

class Artist extends Component {
    state = {
        artist: null,
        invalidId: false
    }

    async componentDidMount() {
        const tempArtist = await getArtist(this.props.match.params.id)
        if (tempArtist == "invalid id") {
            return this.setState({ invalidId: true })
        }
        this.setState({ artist: tempArtist })
    }


    render() {

        return (

            this.state.artist ?
                <div className="artist_individual">
                    <div className="artistCard">
                        {this.state.artist.images.length ? <img src={this.state.artist.images[1].url} /> : <IconProfile />}
                        <div>
                            <h2>{this.state.artist.name}</h2>
                            <div className="primaryText">
                                {this.state.artist.genres.map((gener, i) => {
                                    return (<span key={i}>
                                        {uppercaseFirstLetter(gener)}{i >= 0 && i === this.state.artist.genres.length - 1 ? '' : ','} &nbsp;
                                    </span>)
                                })}
                            </div>
                            <div className="secondaryText">
                                {this.state.artist.popularity}% Popular
                            </div>
                            <div className="secondaryText">
                                {numberWithComa(this.state.artist.followers.total)} Followers
                            </div>
                            <a className="linkClass" href={this.state.artist.external_urls.spotify}>
                                <button className="btn-primary">View on Spotify</button>
                            </a>
                        </div>
                    </div>
                </div> : this.state.invalidId ? <div className="emptyContent">No Artist found at the given url</div> : <Loader />

        )
    }
}

export default Artist