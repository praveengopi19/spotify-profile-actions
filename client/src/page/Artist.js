import React, { Component } from 'react'
import Loader from '../components/Loader'
import { uppercaseFirstLetter } from '../utils/UppercaseFirstLetter'
import { getArtist } from '../Spotify/index';

class Artist extends Component {
    state = {
        artist: null
    }

    async componentDidMount() {
        const tempArtist = await getArtist(this.props.match.params.id)
        this.setState({ artist: tempArtist })
        console.log(tempArtist)
    }


    render() {
        return (

            this.state.artist ?
                <div className="artist_individual">
                    <div className="artistCard">
                        <img src={this.state.artist.images[1].url} />
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
                                {this.state.artist.followers.total} Followers
                            </div>
                            <a className="linkClass" href={this.state.artist.external_urls.spotify}>
                                <button className="btn-primary">View on Spotify</button>
                            </a>
                        </div>
                    </div>
                </div> : <Loader />

        )
    }
}

export default Artist