import React from 'react'
import Editor from '@monaco-editor/react';
import themeOptions from '../constants/themeOptions';
import languageOptions from '../constants/languageOptions';
import { Link } from 'react-router-dom';



const EditorConfig = ({ handleLanguageChange, handleThemeChange, selectedLanguage, selectedTheme }) => {

    return (
        <div className='d-flex mb-4'>
            <div className='me-4'>
                <label className='form-label' htmlFor="languageSelect">Select Language:</label>
                <select className='form-select bg-dark text-light' id="languageSelect" onChange={handleLanguageChange} value={selectedLanguage}>
                    {languageOptions.map(option => (
                        <option key={option.id} name={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className='me-4'>
                <label className='form-label' htmlFor="themeSelect">Select Theme:</label>
                <select className='form-select bg-dark text-light' id="themeSelect" onChange={handleThemeChange} value={selectedTheme}>
                    {themeOptions.map(option => (
                        <option key={option.id} value={option.value}>{option.label}</option>
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
                    <Link className='btn btn-success' to="/chat">AskAI</Link>
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
