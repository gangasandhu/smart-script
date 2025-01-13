import React from 'react';
import Select from 'react-select';
import themeOptions from '../constants/themeOptions';
import languageOptions from '../constants/languageOptions';
import { customStyles } from '../constants/customStyles';
// import '../styles/editor-config.css';

const EditorConfig = ({ theme, handleLanguageChange, handleThemeChange }) => {
    return (
        <div className="mb-4 w-[80%] md:w-[30%]">
            {/* Language Selection */}
            <div className="flex-col" data-testid="language">
                <label className={`block mb-2 text-lg font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`} htmlFor="languageSelect">
                    Select Language:
                </label>
                <div data-testid="language-tab">
                    <Select
                        placeholder="Filter By Category"
                        options={languageOptions}
                        styles={customStyles}
                        defaultValue={languageOptions[0]}
                        onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                    />
                </div>
            </div>

            {/* Theme Selection */}
            {/* <div className="me-4 flex-1" data-testid="theme">
                <label className={`block mb-2 text-lg font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`} htmlFor="themeSelect">
                    Select Theme:
                </label>
                <div data-testid="theme-tab">
                    <Select
                        options={themeOptions}
                        styles={customStyles}
                        defaultValue={themeOptions[0]}
                        onChange={(selectedOption) => handleThemeChange(selectedOption)}
                    />
                </div>
            </div> */}
        </div>
    )
}
export default EditorConfig;
