import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor'

const Home = () => {

  // code editor variables
  const [value, setValue] = useState("// write your code here");
  const [selectedTheme, setSelectedTheme] = useState('vs-dark');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')

  const handleEditorChange = () => {
    // set the value of the code inside the editor
  }

  const handleThemeChange = () => {
    // set the theme of the editor
  }

  const handleLanguageChange = () => {
    // set the programming language
  }

  const runCode = () => {
    // compile the code inside the editor
  }


  return (
    <div>
      <CodeEditor
        handleEditorChange={handleEditorChange}
        handleThemeChange={handleThemeChange}
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={selectedLanguage}
        selectedTheme={selectedTheme}
        runCode={runCode}
        value={value}
      />
    </div>
  )
}

export default Home
