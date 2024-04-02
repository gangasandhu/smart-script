import React from 'react'
import Editor from '@monaco-editor/react';

const CodeEditor = ({ selectedLanguage, selectedTheme, handleEditorChange, value}) => {
    return (
        <div>

            <div className='shadow'>
                <p className='text-secondary text-start mt-4 p-2'>Code Editor</p>
                {/* <hr /> */}
                
                <Editor
                    height="60vh"
                    width="100%"
                    language={selectedLanguage}
                    value={value}
                    theme={selectedTheme}
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    )
}

export default CodeEditor
