import React from 'react'
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
        </div>
    )
}
export default EditorConfig
