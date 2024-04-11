import React from 'react'
import Editor from '@monaco-editor/react';

const AiEditor = ({ selectedLanguage, selectedTheme, aiValue, closeAi, copyText }) => {
    return (
        <div className='shadow' data-testid='code-suggestion'>
            <div className='d-flex align-items-center p-2 justify-content-between'>
                <p className='text-secondary text-start mt-4'>AI Code Suggestion</p>
                <div>
                    <button className='btn btn-dark' data-testid='copy-button' onClick={copyText}>Copy</button>
                    <button className='btn btn-danger ms-2' onClick={closeAi}>Close</button>
                </div>
            </div>
            <Editor
                height="35vh"
                width="100%"
                language={selectedLanguage}
                value={aiValue}
                theme={selectedTheme}
            />
        </div>
    )
}

export default AiEditor
