import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

class Login extends Component {
    render() {
        return (this.props.auth ? (<Redirect to='/' />) :
            (<>
                <div className="loginDiv">
                    <h2>Spotify Profile Action</h2>
                    <a href={0 ? 'http://localhost:5000/loginserver' : "https://spotify-profile-actions.herokuapp.com/loginserver"} className="linkClass btn-primary loginButton" >LOG IN TO SPOTIFY</a>
                </div>
            </>))
    }
}

export default withRouter(Login)