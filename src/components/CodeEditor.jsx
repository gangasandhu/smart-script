import React from 'react'
import Editor from '@monaco-editor/react';

const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'vs-dark' },
    { label: 'High Contrast', value: 'hc-black' }
];

const languageOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    // Add more languages as needed
];

const EditorConfig = ({ handleLanguageChange, handleThemeChange, selectedLanguage, selectedTheme }) => {

    return (
        <div className='d-flex mb-4'>
            <div className='me-4'>
                <label className='form-label' htmlFor="languageSelect">Select Language:</label>
                <select className='form-select bg-dark text-light' id="languageSelect" onChange={handleLanguageChange} value={selectedLanguage}>
                    {languageOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className='me-4'>
                <label className='form-label' htmlFor="themeSelect">Select Theme:</label>
                <select className='form-select bg-dark text-light' id="themeSelect" onChange={handleThemeChange} value={selectedTheme}>
                    {themeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}


const CodeEditor = ({ handleLanguageChange, selectedLanguage, handleThemeChange, selectedTheme, handleEditorChange, runCode, value }) => {
    return (
        <div>

            <div className='shadow'>
                <p className='text-secondary text-start mt-4'>Code Editor</p>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                    <EditorConfig
                        handleLanguageChange={handleLanguageChange}
                        handleThemeChange={handleThemeChange}
                        selectedLanguage={selectedLanguage}
                        selectedTheme={selectedTheme}
                    />
                    <button className='btn btn-success '>AskAI</button>
                    <button className='btn btn-primary' onClick={runCode}>Run</button>
                </div>
                <Editor
                    height="50vh"
                    width="100%"
                    defaultLanguage={selectedLanguage}
                    value={value}
                    theme={selectedTheme}
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    )
}

export default CodeEditor
