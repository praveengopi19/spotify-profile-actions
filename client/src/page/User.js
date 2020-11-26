import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class User extends Component {
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search)
    }
    render() {
        return (<h1>User</h1>)
    }
}

export default withRouter(User)