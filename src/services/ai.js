import axios from 'axios';

const API_KEY = import.meta.env.VITE_AI_API_KEY;

const processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map(messageObject => {
        let role = "";
        if (messageObject.sender === "ChatGPT") {
            role = "assistant";
        } else {
            role = "user";
        }
        return { role: role, content: messageObject.message };
    });

    const systemMessage = {
        role: "system",
        content: "Explain like I am an experienced software developer." // can change this to have chatgpt explain based on context
    };

    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            systemMessage,
            ...apiMessages // [message1, message2, message3]
        ]
    };

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            }
        });
        const data = response.data;
        console.log(data);
        return data.choices[0].message.content
    } catch (error) {
        // Handle error
        console.error("Error:", error);
    }
};

export default processMessageToChatGPT;
