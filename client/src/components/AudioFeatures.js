import React from 'react'

import { uppercaseFirstLetter } from '../utils/UppercaseFirstLetter';

function AudioFeatures({ audioFeatures }) {
    const arr = []
    arr.push(<h3>Audio Features</h3>)
    for (const [key, value] of Object.entries(audioFeatures)) {
        arr.push(
            <div key={key}>
                <div key={key + value} className="playlistProgress_info">
                    <div>
                        {uppercaseFirstLetter(key)}
                    </div>
                    <div>
                        {value}%
                </div>
                </div>
                <div key={key + value + "bar"} className="playlistProgress_bar_container">
                    <div style={{ width: `${value}%` }}>
                    </div>
                </div>
            </div>)
    }
    return arr
}

export default AudioFeatures