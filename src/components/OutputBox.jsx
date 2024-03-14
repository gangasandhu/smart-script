import React from 'react'
import '../styles/output.css'

const OutputBox = ({ outputDetails, processing }) => {
    return (
        <div className='compiler'>
            <p>Output</p>
            <hr />
            $ {processing && "\nCompiling the code..."}
            <div className='output-window'>
                <pre>{outputDetails}</pre>
            </div>
        </div>

    )
}

export default OutputBox
