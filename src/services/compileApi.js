import axios from "axios";

const API_KEY = import.meta.env.VITE_COMPILE_API_KEY
const API_URL = import.meta.env.VITE_COMPILE_API_URL

const getOutputToken = async (sourceCode, languageId, customInput) => {
    const formData = {
        language_id: languageId,
        // encode source code in base64
        source_code: btoa(sourceCode),
        stdin: btoa(customInput),
    };

    const options = {
        method: 'POST',
        url: API_URL,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: formData,
    }

    const response = await axios.request(options);
    console.log("res.data", response.data);
    const token = response.data.token;
    return token
}

const getOutputStatus = async (token) => {
    
    const options = {
        method: 'GET',
        url: `${API_URL}/${token}`,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };
    let response = await axios.request(options);

    return response
}

export {getOutputToken, getOutputStatus}