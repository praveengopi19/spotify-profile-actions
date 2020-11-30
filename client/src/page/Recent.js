import React, { Component } from 'react'
import AllTracks from '../components/AllTracks'
import Loader from '../components/Loader'


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
            <div>
                <h2 className="heading">Recently Played Tracks</h2>
                { this.state.recent ? <AllTracks items={this.state.recent.items} from={"recent"} /> : <Loader />}
            </div>
        )
    }
}

export default Recent