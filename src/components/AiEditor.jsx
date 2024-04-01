import React from 'react'
import Editor from '@monaco-editor/react';



const AiEditor = ({ selectedLanguage, selectedTheme, aiValue, closeAi}) => {
    return (
        <div className='shadow'>
            <div className='d-flex justify-content-between'>
                <p className='text-secondary text-start mt-4'>AI Code Suggestion</p>
                <button className='btn btn-warning m-4' onClick={closeAi}>Close</button>
            </div>
            <hr />
            <Editor
                height="40vh"
                width="100%"
                language={selectedLanguage}
                value={aiValue}
                theme={selectedTheme}
            />
        </div>
    )
}

export default AiEditor
