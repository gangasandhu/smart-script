import React from 'react'
import Editor from '@monaco-editor/react';

const AiEditor = ({ selectedLanguage, selectedTheme, aiValue, closeAi, copyText }) => {
    return (
        <div className='shadow' data-testid='code-suggestion'>
            <div className='flex items-center p-2 justify-between'>
                <p className='mt-4'>AI Code Suggestion</p>
                <div className='flex space-x-2'>
                    <button className='px-4 py-2 bg-neutral-700 rounded-md' data-testid='copy-button' onClick={copyText}>Copy</button>
                    <button className='px-4 py-2 bg-rose-700 rounded-md' onClick={closeAi}>Close</button>
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
