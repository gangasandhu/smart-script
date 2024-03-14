import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import OutputBox from '../components/OutputBox';
import { getOutputStatus, getOutputToken } from '../services/compileApi';

const Home = () => {

  // code editor variables
  const [value, setValue] = useState("// write your code here");
  const [selectedTheme, setSelectedTheme] = useState('vs-dark');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("")

  const handleEditorChange = (value) => {
    // set the value of the code inside the editor
    setValue(value)
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

  const runCode = async () => {
    // compile the code inside the editor
    console.log("code: ", value)
    await compileCode(value, 93, customInput)

  }

  // compile code and generate an output token
  const compileCode = async (sourceCode, languageId, customInput) => {
    setProcessing(true)
    try {
      const token = await getOutputToken(sourceCode, languageId, customInput)
      getSubmission(token);
    } catch (error) {
      console.log(error);
      setProcessing(false)
    }
  }

  // validate the output token and get the compiled output
  const getSubmission = async (token) => {
    try {
      let response = await getOutputStatus(token)
      console.log("get submission", response.data)
      let statusId = response.data.status?.id;
      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          getSubmission(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        const out = atob(response.data.stdout)
        setOutputDetails(out);
        console.log("Output", out);
        return;
      }
    } catch (error) {
      console.error(error);
      setProcessing(false)
    }
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
      <OutputBox
        outputDetails={outputDetails}
        processing={processing}
      />
    </div>
  )
}

export default Home
