import React, { Component } from 'react'
import AllPlaylist from '../components/AllPlaylist'
import Loader from '../components/Loader'

import { getAllPlaylist } from '../Spotify/index'

class YourPlaylist extends Component {
    state = {
        playlist: null
    }

    async componentDidMount() {
        const tempPlaylist = await getAllPlaylist()
        this.setState({ playlist: tempPlaylist })
    }


    render() {
        return (
            <>
                <h2 className="heading">Your Playlists</h2>
                { this.state.playlist ? this.state.playlist.items ? <AllPlaylist playlists={this.state.playlist.items} /> : <div>No Tracks Found</div> : <Loader />}
            </>)
    }
}

export default YourPlaylist