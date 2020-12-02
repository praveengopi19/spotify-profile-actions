import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch, withRouter, Link } from 'react-router-dom'

import { getAuthToken, getAssessToken, getRefreshToken, removeTokens } from './Spotify/index'

import Navbar from './components/Navbar'

const Login = lazy(() => import('./page/Login'))
const User = lazy(() => import('./page/User'))
const Topartists = lazy(() => import('./page/Topartists'))
const Toptracks = lazy(() => import('./page/Toptracks'))
const Recent = lazy(() => import('./page/Recent'))
const YourPlaylist = lazy(() => import('./page/YourPlaylist'))

const Artist = lazy(() => import('./page/Artist'))
const Track = lazy(() => import('./page/Track'))
const Playlist = lazy(() => import('./page/Playlist'))
const NotFound = lazy(() => import('./components/NotFound'))


import Loader from './components/Loader'


const PrivateRoute = ({ componet: Component, location, auth, ...rest }) => {
    let destination = location.pathname
    return (
        <Route {...rest} render={(props) => auth === true ?
            (<div className="authcontentSection">
                <div className="inner">
                    <Component {...rest} {...props} />
                </div>
            </div>
            ) : (<Redirect to={{ pathname: '/login', state: { destination } }} />)} />
    )
}


class App extends React.Component {
    state = {
        auth: false,
        isLoading: true
    }

    async componentDidMount() {

        if (getAssessToken() && getRefreshToken()) {
            this.setState({ auth: true })
            //console.log("local 1", getAssessToken(), getRefreshToken())
        }
        else {
            //console.log("local 2")
            let parms = this.props.location.pathname === "/" ? (new URLSearchParams(this.props.location.search)).get("token") : null

            if (parms == "invalid" && parms !== null) {
                return removeTokens()
            }

            let tempToken = parms ? await getAuthToken(parms) : ""

            if (tempToken && !this.state.auth) {
                //console.log("local 3")
                this.setState({ auth: true })
            }
        }
        this.setState({ isLoading: false })
    }


    render() {
        //throw new Error("")
        const { location } = this.props
        return (
            <>
                {!this.state.isLoading ?
                    < Suspense fallback={<Loader />}>
                        {this.state.auth && <Navbar />}
                        <Switch >
                            <Route path="/login" render={(props) => <Login {...props} auth={this.state.auth} />} exact />
                            <PrivateRoute path="/" location auth={this.state.auth} componet={User} exact />
                            <PrivateRoute path="/artist" location auth={this.state.auth} componet={Topartists} exact />
                            <PrivateRoute path="/tracks" location auth={this.state.auth} componet={Toptracks} exact />
                            <PrivateRoute path="/recent" location auth={this.state.auth} componet={Recent} exact />
                            <PrivateRoute path="/playlist" location auth={this.state.auth} componet={YourPlaylist} exact />
                            <PrivateRoute path="/artist/:id" location auth={this.state.auth} componet={Artist} exact />
                            <PrivateRoute path="/track/:id" location auth={this.state.auth} componet={Track} exact />
                            <PrivateRoute path="/playlist/:id" location auth={this.state.auth} componet={Playlist} exact />
                            <Route component={NotFound} />
                        </Switch>
                    </ Suspense >

                    : <Loader />
                }
            </>)
    }
}

export default withRouter(App);