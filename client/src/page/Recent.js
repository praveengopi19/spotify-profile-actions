import React, { Component } from 'react'
import AllTracks from '../components/AllTracks'


import { getRecent } from '../Spotify/index'

class Recent extends Component {
    state = {
        recent: null
    }

    async componentDidMount() {
        let tempRecent = await getRecent()
        this.setState({ recent: tempRecent })
    }

    render() {
        return (
            <>
                <h2 className="heading">Recently Played Tracks</h2>
                { this.state.recent ? <AllTracks items={this.state.recent.items} from={"recent"} /> : <h1>Loading</h1>}
            </>
        )
    }
}

export default Recent