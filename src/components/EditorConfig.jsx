import React from 'react';
import Select from 'react-select';
import themeOptions from '../constants/themeOptions';
import languageOptions from '../constants/languageOptions';
import { customStyles } from '../constants/customStyles';
import '../styles/editor-config.css';

const EditorConfig = ({ theme, handleLanguageChange, handleThemeChange }) => {
    return (
        <div className='editor-config d-flex mb-4'>
            <div className='me-4' data-testid='language'>
                <label className={`form-label ${theme == 'light' ? 'text-black' : 'text-white'}`} htmlFor="languageSelect">Select Language:</label>
                <Select
                    placeholder={`Filter By Category`}
                    options={languageOptions}
                    styles={customStyles}
                    defaultValue={languageOptions[0]}
                    onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                />
            </div>
            <div className='me-4' data-testid='theme'>
                <label className={`form-label ${theme == 'light' ? 'text-black' : 'text-white'}`} htmlFor="themeSelect">Select Theme:</label>
                <Select
                    options={themeOptions}
                    styles={customStyles}
                    defaultValue={themeOptions[0]}
                    onChange={(selectedOption) => handleThemeChange(selectedOption)}
                />
            </div>
        </div>
    )
}
export default EditorConfig;
