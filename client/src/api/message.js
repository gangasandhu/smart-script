import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// get all messages for a room
const getMessages = async (room_id) => {
    const response = await axios.get(`${baseURL}/messages/${room_id}`);
    return response.data;
}

// create a new message
const createMessage = async (room_id, user_id, content) => {
    const response = await axios.post(`${baseURL}/messages`, { room_id, user_id, content });
    return response.data;
}

export { getMessages, createMessage };