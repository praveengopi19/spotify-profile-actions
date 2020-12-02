import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { ErrorIcon } from './Icons'

class ErrorBoundry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorinfo) {
        console.log(error, errorinfo)
    }

    render() {

        if (this.state.hasError) {
            return (
                <div className="error404">
                    <ErrorIcon />
                    <div >
                        <div style={{ margin: "10px" }} >Something went wrong</div>
                        <a href="/"><button style={{ margin: "10px" }} className="btn-primary">Go Home</button></a>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }

}

export default ErrorBoundry