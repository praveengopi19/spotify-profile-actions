import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import App from './App'
import ErrorBoundry from './components/ErrorBoundry.js'

import './Assets/spotify.svg';

ReactDOM.render(
    <ErrorBoundry>
        <Router>
            <App />
        </Router>
    </ErrorBoundry>,
    document.getElementById('root'))