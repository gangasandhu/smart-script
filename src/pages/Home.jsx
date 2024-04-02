import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import OutputBox from '../components/OutputBox';
import { getOutputStatus, getOutputToken } from '../services/compileApi';
import languageOptions from '../constants/languageOptions';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AiEditor from '../components/AiEditor';
import { getAiSuggestion } from '../services/ai';
import EditorConfig from '../components/EditorConfig';

const Home = ({mainTheme, changeMainTheme}) => {

  // code editor states
  const [value, setValue] = useState("// write your code here");
  const [selectedTheme, setSelectedTheme] = useState('vs-dark');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0])
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("");

  // AI suggestion states
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [aiValue, setAiValue] = useState("");

  const handleEditorChange = (value) => {
    // set the value of the code inside the editor
    setValue(value)
  }

  const handleThemeChange = (theme) => {
    // set the theme of the editor
    setSelectedTheme(theme.value)
    changeMainTheme(theme.value)
  }

  const handleLanguageChange = (langObj) => {
    console.log(langObj)
    setValue(`// write your ${langObj.value} code here`);
    setSelectedLanguage(langObj);
  }

  const runCode = async () => {
    // compile the code inside the editor
    console.log("code: ", value)
    setOutputDetails("")
    await compileCode(value, selectedLanguage.id, customInput)

  }

  // compile code and generate an output token
  const compileCode = async (sourceCode, languageId, customInput) => {
    console.log("selected language", languageId)
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
        // const out = atob(response.data.stdout)
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("Output", response.data);
        return;
      }
    } catch (error) {
      console.error(error);
      setProcessing(false)
      showErrorToast();
    }
  }

  // message after successfully compiling the code
  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // message for error in compilation
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // get code suggestion from openai api
  const getCodeSuggestion = async () => {
    setShowSuggestion(true);
    const code = value;
    const aiCode = await getAiSuggestion(code, selectedLanguage)
    setAiValue(aiCode)

    console.log(aiCode);
  }

  const closeAi = () => setShowSuggestion(false);
  const copyText = () => {
    navigator.clipboard.writeText(aiValue);
    showSuccessToast("Copied")
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='d-flex justify-content-between align-items-center'>
        <EditorConfig
          theme={mainTheme}
          handleLanguageChange={handleLanguageChange}
          handleThemeChange={handleThemeChange}
        />
        <div>
          <button className='btn btn-success me-2' onClick={getCodeSuggestion}>AskAI</button>
          <button className='btn btn-primary' onClick={runCode}>Run</button>
        </div>
      </div>
      {showSuggestion && <AiEditor
        selectedLanguage={selectedLanguage.value}
        selectedTheme={mainTheme}
        aiValue={aiValue}
        closeAi={closeAi}
        copyText={copyText}
      />}
      <div className='row'>
        <div className='col-lg-8 col-md-8 col-sm-12'>
          <CodeEditor
            handleEditorChange={handleEditorChange}
            selectedLanguage={selectedLanguage.value}
            selectedTheme={mainTheme}
            value={value}
          />
        </div>
        <div className='col-lg-4 col-md-4 col-sm-12'>
          <OutputBox
            outputDetails={outputDetails}
            processing={processing}
            theme={mainTheme}
          />
        </div>
      </div>

    </div>
  )
}

export default Home
