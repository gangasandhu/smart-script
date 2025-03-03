import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ selectedLanguage, selectedTheme, handleEditorChange, value }) => {
    return (
        <div>
            <div className='shadow bg-bgSecondary'>
                <p className='text-secondary text-start p-2'>Code Editor</p>
                {/* <hr /> */}
                <div data-testid='editor'>
                    <Editor
                        height="60vh"
                        width="100%"
                        language={selectedLanguage}
                        value={value}
                        theme={selectedTheme === 'dark' ? 'vs-dark' : 'light'}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeEditor;
