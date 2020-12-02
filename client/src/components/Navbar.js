import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { IconProfile, IconTopartists, IconToptracks, IconPlaylist, IconRecent } from './Icons'

class Navbar extends Component {
    state = {
        pathname: null
    }

    componentDidMount() {
        this.setState({ pathname: this.props.location.pathname })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pathname != this.props.location.pathname) {
            this.setState({ pathname: this.props.location.pathname })
        }
    }

    checkNavActive(navPath) {
        if (navPath == this.state.pathname) {
            return true
        }
        return false
    }

    render() {
        return (
            <nav>
                <span></span>
                <div className="navInnerContainer">
                    <Link className={"navLink " + (this.checkNavActive("/") && "navLinkActive")} to="/">
                        <IconProfile className="navicons" />
                        <div>Profile</div>
                    </Link>
                    <Link className={"navLink " + (this.checkNavActive("/artist") && "navLinkActive")} to="/artist">
                        <IconTopartists className="navicons" />
                        <div>Top Artist</div>
                    </Link>
                    <Link className={"navLink " + (this.checkNavActive("/tracks") && "navLinkActive")} to="/tracks">
                        <IconToptracks className="navicons" />
                        <div>Top Tracks</div>
                    </Link>
                    <Link className={"navLink " + (this.checkNavActive("/playlist") && "navLinkActive")} to="/playlist">
                        <IconPlaylist className="navicons" />
                        <div>Playlist</div>
                    </Link>
                    <Link className={"navLink " + (this.checkNavActive("/recent") && "navLinkActive")} to="/recent">
                        <IconRecent className="navicons" />
                        <div>Recent</div>
                    </Link>
                </div>
                <span></span>
            </nav>)
    }
}

export default withRouter(Navbar)