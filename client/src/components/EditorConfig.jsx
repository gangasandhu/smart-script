import React from 'react';
import Select from 'react-select';
import languageOptions from '../constants/languageOptions';
// import '../styles/editor-config.css';

const EditorConfig = ({ language, theme, handleLanguageChange }) => {
    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: theme === 'dark' ? 'rgba(35, 35, 35)' : '#ffffff',
            borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: theme === 'dark' ? 'rgba(35, 35, 35)' : '#ffffff',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
                ? theme === 'dark'
                    ? 'rgba(55, 55, 55)'
                    : '#e5e7eb'
                : 'transparent',
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
        }),
        singleValue: (base) => ({
            ...base,
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
        }),
    };
    return (
        <div className="mb-4 w-[80%] md:w-[30%]">
            {/* Language Selection */}
            <div className="flex-col" data-testid="language">
                <label className={`block mb-2 text-lg`} htmlFor="languageSelect">
                    Select Language:
                </label>
                <div data-testid="language-tab">
                    <Select
                        placeholder="Filter By Category"
                        options={languageOptions}
                        styles={customStyles}
                        value={language}
                        defaultValue={languageOptions[0]}
                        onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                    />
                </div>
            </div>
        </div>
    )
}
export default EditorConfig;
