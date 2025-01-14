import React, { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import OutputBox from '../components/OutputBox';
// import { getOutputStatus, getOutputToken } from '../services/compileApi';
import { compileCode } from '../services/compileUtils';
import languageOptions from '../constants/languageOptions';
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from '../utils/message';
import "react-toastify/dist/ReactToastify.css";
import AiEditor from '../components/AiEditor';
import { getAiSuggestion } from '../services/ai';
import EditorConfig from '../components/EditorConfig';
import '../styles/home.css';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import useSocket from '../hooks/useSocket';
import { createRoomUser } from '../api/roomUser';
import { getCodeRoom, updateCodeRoom } from '../api/codeRoom';

const CodeRoom = ({ mainTheme, changeMainTheme }) => {

  const { roomId } = useParams(); // room id from url

  // user state variable
  const { user } = useUser()
  const { sendUser, joinRoom, getRoomUsers, sendText, getText } = useSocket()
  const [usersInRoom, setUsersInRoom] = useState([])

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


  // fetch user data from the server and update the user state
  useEffect(() => {
    const setUpRoom = async () => {
      if (user) {
        sendUser(user)
        joinRoom(roomId, user.id)
        getRoomUsers((users) => {
          setUsersInRoom(users)
        })
        await createRoomUser(roomId, user.id)

        getText((text) => {
          setValue(text)
        })
      }
    }
    setUpRoom()
  }, [user])


  // fetch code from the server and update the code every 5 seconds
  useEffect(() => {
    const fetchCode = async () => {
      const { language, content } = await getCodeRoom(roomId)
      setSelectedLanguage(prev => ({ ...prev, value: language }))
      setValue(content)
    }
    fetchCode()
  }, [roomId])

  useEffect(() => {
    const updateCode = async () => {
      await updateCodeRoom(roomId, { content: value, language: selectedLanguage.value })
    }

    const interval = setInterval(() => {
      updateCode()
    }, 5000)

    return () => clearInterval(interval)
  }, [roomId, value, selectedLanguage])


  const handleEditorChange = (value) => {
    // set the value of the code inside the editor
    setValue(value)
    sendText(value, roomId)
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
    await compileCode(value, selectedLanguage.id, customInput, setProcessing, setOutputDetails)
  }


  // get code suggestion from openai api
  const getCodeSuggestion = async () => {
    setShowSuggestion(true);
    const code = value;
    const aiCode = await getAiSuggestion(code, selectedLanguage)
    setAiValue(aiCode)

    console.log(aiCode);
  }

  const closeAi = () => setShowSuggestion(false);

  // copyText to clipboard
  const copyText = (value) => {
    navigator.clipboard.writeText(value);
    showSuccessToast("Copied")
  }

  return (
    <div className={`p-8 ${mainTheme === "light" ? "text-gray-800" : "text-gray-100"}`} data-testid="website">
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

      <div className='flex justify-between items-center'>
        {usersInRoom && <div className="">Collaborators: {usersInRoom.map(user => user.username).join(', ')}</div>}
        <button onClick={() => copyText(roomId)} className='bg-gray-700 px-4 py-2 rounded-md'>Share</button>
      </div>

      {/* Editor Bar */}
      <div className="editor-bar flex justify-between items-center m-4">
        <EditorConfig
          theme={mainTheme}
          handleLanguageChange={handleLanguageChange}
          handleThemeChange={handleThemeChange}
        />

        {/* CTA Buttons */}
        <div className="cta flex space-x-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            data-testid="askai"
            role="ask"
            onClick={getCodeSuggestion}
          >
            AskAI
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            role="link"
            onClick={runCode}
          >
            Run
          </button>
        </div>
      </div>

      {/* AI Editor */}
      {showSuggestion && (
        <AiEditor
          selectedLanguage={selectedLanguage.value}
          selectedTheme={mainTheme}
          aiValue={aiValue}
          closeAi={() => closeAi(aiValue)}
          copyText={copyText}
        />
      )}


      <div className="flex flex-col md:flex-row space-x-4 h-[60%]">
        {/* Code Editor */}
        <div className="md:w-2/3">
          <CodeEditor
            handleEditorChange={handleEditorChange}
            selectedLanguage={selectedLanguage.value}
            selectedTheme={mainTheme}
            value={value}
          />
        </div>

        {/* Output Box */}
        <div className="md:w-1/3" data-testid="compiler">
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

export default CodeRoom;
