import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AllTrack from '../components/AllTracks'
import Loader from '../components/Loader'

import { getUser, getFollowing, getAllArtist, getAllTracks, getAllPlaylist, removeTokens } from '../Spotify/index'

class User extends Component {
    state = {
        user: null,
        following: null,
        artists: null,
        playlists: null,
        tracks: null
    }

    async componentDidMount() {
        const user = await getUser()
        const following = await getFollowing()
        if (user && following) {
            const artists = await getAllArtist("long_term", 10)
            const tracks = await getAllTracks("long_term", 10)
            const playlists = await getAllPlaylist()
            this.setState({ user, following, artists, tracks, playlists })
        }
    }

    render() {
        const { user, artists, tracks, following, playlists } = this.state
        return (
            user && following && tracks && artists && playlists ? (
                <div className="userContainer ">
                    <div className="flexDiv">
                        <div className="card">
                            <div className="imageContainer">
                                <img src={user.images.length && user.images[0].url} />
                            </div>
                            <h2>{user.display_name}</h2>
                            <div className="followFollwersDiv">
                                <div>
                                    <div className="primaryText">{user.followers.total}</div>
                                    <div className="secondaryText">FOLLOWING</div>
                                </div>
                                <div>
                                    <div className="primaryText">{artists.items.length}</div>
                                    <div className="secondaryText">FOLLOWERS</div>
                                </div>
                                <div>
                                    <div className="primaryText">{playlists.items.length}</div>
                                    <div className="secondaryText">PLAYLIST</div>
                                </div>
                            </div>

                            <div className="followFollwersDiv">
                                <a className="linkClass" targrt="_blank" href={user.external_urls.spotify}>
                                    <button className="btn-primary">View on Spotify</button>
                                </a>
                                <button onClick={() => removeTokens()} className="btn-secondary">Log Out</button>
                            </div>

                        </div>

                    </div>
                    <div className="left">
                        <div className="allTracksHeading">
                            <h3>
                                Top Artists of All Time
                            </h3>
                            <Link to="/artist" className="linkClass">
                                <button className="borderButton">SEE MORE</button>
                            </Link>
                        </div>
                        <>
                            {artists.items.length > 0 ? artists.items.map((artist, i) => {
                                return (
                                    <Link to={`/artist/${artist.id}`} className="linkClass">
                                        <div className="tracksIndividual">
                                            <img src={artist.images[2].url} alt={artist.name} />
                                            <div className="tracksNameAlbum">
                                                <div className="name">{artist.name}</div>
                                            </div>
                                        </div>
                                    </Link>)
                            }) : <div className="tracksNameAlbum"> No Artist found :(</div>}
                        </>
                    </div>
                    <div className="right">
                        <div className="allTracksHeading">
                            <h3>
                                Top Tracks of All Time
                            </h3>
                            <Link to="/tracks" className="linkClass">
                                <button className="borderButton">SEE MORE</button>
                            </Link>
                        </div>
                        <AllTrack items={tracks.items} from={"user"} />
                    </div>
                </div>
            ) : <Loader />
        )
    }
}

export default User