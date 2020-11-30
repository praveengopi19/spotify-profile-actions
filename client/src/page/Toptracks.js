import React, { Component } from 'react'
import AllTracks from '../components/AllTracks'
import Loader from '../components/Loader'

import { getAllTracks } from '../Spotify/index'

class Toptracks extends Component {
    state = {
        tracks: null,
        active: "long_term"
    }

    async componentDidMount() {
        const tempTracks = await getAllTracks("long_term")
        this.setState({ tracks: tempTracks })
    }

    async changePeriod(period) {
        if (period !== this.state.active) {
            const tempTracks = await getAllTracks(period)
            this.setState({ tracks: tempTracks })
            this.setState({ active: period })
        }
    }

    render() {
        // console.log(this.state.tracks)
        return (
            <>
                <div className="allTracksHeading">
                    <h2>Top Tracks</h2>
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

                {this.state.tracks ? <AllTracks items={this.state.tracks.items} from={"tracks"} /> : <Loader />}
            </>)
    }
}

export default Toptracks