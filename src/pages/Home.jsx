import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor'

const Home = () => {

  // code editor variables
  const [value, setValue] = useState("// write your code here");
  const [selectedTheme, setSelectedTheme] = useState('vs-dark');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')

  const handleEditorChange = (value) => {
    setValue(value)
    // set the value of the code inside the editor
  }

  const handleThemeChange = (e) => {
    // set the theme of the editor
    setSelectedTheme(e.target.value)
  }

  const handleLanguageChange = (e) => {
    setValue(`// write your ${e.target.value} code here`);
    setSelectedLanguage(e.target.value);
    console.log(e.target.value)
  }

  const runCode = () => {
    // compile the code inside the editor
    console.log("code: ", value)
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
