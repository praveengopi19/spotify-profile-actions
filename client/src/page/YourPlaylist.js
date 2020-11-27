import React, { Component } from 'react'
import AllPlaylist from '../components/AllPlaylist'

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
                { this.state.playlist ? <AllPlaylist playlists={this.state.playlist.items} /> : <h1>Loading</h1>}
            </>)
    }
}

export default YourPlaylist