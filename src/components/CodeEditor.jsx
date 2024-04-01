import React from 'react'
import Editor from '@monaco-editor/react';

<<<<<<< HEAD
const CodeEditor = ({ selectedLanguage, selectedTheme, handleEditorChange, value}) => {
=======
const EditorConfig = ({ handleLanguageChange, handleThemeChange }) => {
    return (
        <div className='d-flex mb-4'>
            <div className='me-4'>
                <label className='form-label' htmlFor="languageSelect">Select Language:</label>
                <div className="select-language" data-testid={`language`}>
                    <Select
                        placeholder={`Filter By Category`}
                        options={languageOptions}
                        styles={customStyles}
                        defaultValue={languageOptions[0]}
                        onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                    />
                </div>
            </div>
            <div className='me-4'>
                <label className='form-label' htmlFor="themeSelect">Select Theme:</label>
                <div className="select-theme" data-testid={`theme`}>
                    <Select
                        options={themeOptions}
                        styles={customStyles}
                        defaultValue={themeOptions[0]}
                        onChange={(selectedOption) => handleThemeChange(selectedOption)}
                        data-testid={'theme-options'}
                    />
                </div>
            </div>
        </div >
    )
}

const CodeEditor = ({ handleLanguageChange, selectedLanguage, handleThemeChange, selectedTheme, handleEditorChange, runCode, value }) => {
>>>>>>> 8ce962f (Add unit tests for language and theme features)
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
