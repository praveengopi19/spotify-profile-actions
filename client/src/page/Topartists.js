import React, { Component } from 'react'
import AllArtist from '../components/AllArtist'
import { getAllArtist } from '../Spotify'

class Topartists extends Component {
    state = {
        artist: null,
        active: "long_term"
    }

    async componentDidMount() {
        const tempArtists = await getAllArtist("long_term")
        this.setState({ artist: tempArtists })
    }

    async changePeriod(period) {
        if (period !== this.state.active) {
            const tempArtists = await getAllArtist(period)
            this.setState({ artist: tempArtists })
            this.setState({ active: period })
        }
    }

    render() {
        // console.log(this.state.tracks)
        return (
            <>
                <div className="allTracksHeading">
                    <h2>Top Artist</h2>
                    <div>
                        <button className={this.state.active === "long_term" ? "activespan" : ''} onClick={() => this.changePeriod("long_term")}>
                            <span>All Time</span>
                        </button>
                        <button className={this.state.active === "medium_term" ? "activespan" : ''} onClick={() => this.changePeriod("medium_term")}>
                            <span>Last 6 Months</span>
                        </button>
                        <button className={this.state.active === "short_term" ? "activespan" : ''} onClick={() => this.changePeriod("short_term")}>
                            <span>Last 4 Weeks</span>
                        </button>
                    </div>
                </div>

                {this.state.artist ? <AllArtist artists={this.state.artist} /> : <h1>Loading</h1>}
            </>)
    }
}


export default Topartists