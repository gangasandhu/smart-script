import React from 'react'
import Editor from '@monaco-editor/react';
import Select from 'react-select'
import themeOptions from '../constants/themeOptions';
import languageOptions from '../constants/languageOptions';
import { Link } from 'react-router-dom';
import { customStyles } from '../constants/customStyles';



const EditorConfig = ({ handleLanguageChange, handleThemeChange }) => {

    return (
        <div className='d-flex mb-4'>
            <div className='me-4'>
                <label className='form-label' htmlFor="languageSelect">Select Language:</label>
                <Select
                    placeholder={`Filter By Category`}
                    options={languageOptions}
                    styles={customStyles}
                    defaultValue={languageOptions[0]}
                    onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                />
            </div>
            <div className='me-4'>
                <label className='form-label' htmlFor="themeSelect">Select Theme:</label>
                <Select
                    options={themeOptions}
                    styles={customStyles}
                    defaultValue={themeOptions[0]}
                    onChange={(selectedOption) => handleThemeChange(selectedOption)}
                 />
            </div>
        </div >
    )
}


const CodeEditor = ({ handleLanguageChange, selectedLanguage, handleThemeChange, selectedTheme, handleEditorChange, runCode, value, getCodeSuggestion }) => {
    return (
        <div>

            <div className='shadow'>
                <p className='text-secondary text-start mt-4'>Code Editor</p>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                    <EditorConfig
                        handleLanguageChange={handleLanguageChange}
                        handleThemeChange={handleThemeChange}
                    />
                    <button className='btn btn-success' onClick={getCodeSuggestion}>AskAI</button>
                    <button className='btn btn-primary' onClick={runCode}>Run</button>
                </div>
                <Editor
                    height="50vh"
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
