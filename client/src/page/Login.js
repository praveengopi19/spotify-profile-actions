import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../Spotify/index'
import './pages.css'

class Login extends Component {
    render() {
        return (this.props.auth ? (<Redirect to='/' />) :
            (<>
                <div className="loginDiv">
                    <h2>Spotify Profile Action</h2>
                    <button className="btn-primary loginButton" onClick={loginUser}>LOG IN TO SPOTIFY</button>
                </div>
            </>))
    }
}

export default Login