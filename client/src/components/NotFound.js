import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundIcon } from './Icons'

function NotFound() {
    return (
        <div className="error404">
            <NotFoundIcon />
            <div >
                <div style={{ margin: "10px" }} >Page you are looking for is Not found </div>
                <Link to="/" className="linkClass"><button style={{ margin: "10px" }} className="btn-primary">Go Home</button></Link>
            </div>
        </div>

    )
}

export default NotFound