import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor'
import OutputBox from '../components/OutputBox';
import { getOutputStatus, getOutputToken } from '../services/compileApi';
import languageOptions from '../constants/languageOptions';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

  // code editor variables
  const [value, setValue] = useState("// write your code here");
  const [selectedTheme, setSelectedTheme] = useState('vs-dark');
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0])
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState("")

  const handleEditorChange = (value) => {
    // set the value of the code inside the editor
    setValue(value)
  }

  const handleThemeChange = (theme) => {
    // set the theme of the editor
    setSelectedTheme(theme.value)
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
        const out = atob(response.data.stdout)
        setOutputDetails(out);
        showSuccessToast(`Compiled Successfully!`);
        console.log("Output", out);
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
      <CodeEditor
        handleEditorChange={handleEditorChange}
        handleThemeChange={handleThemeChange}
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={selectedLanguage.value}
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
