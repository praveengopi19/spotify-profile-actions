import React, { Component } from 'react'
import AllTracks from '../components/AllTracks'


import { getRecent } from '../Spotify/index'

class Recent extends Component {
    state = {
        recent: null
    }

    async componentDidMount() {
        let tempRecent = await getRecent()
        console.log(tempRecent)
        this.setState({ recent: tempRecent })
    }

    render() {
        return (<AllTracks items={this.state.recent.items} />)
    }
}

export default Recent