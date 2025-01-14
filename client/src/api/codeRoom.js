import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Get all code rooms by user
const getUserCodeRooms = async (userId) => {
    const response = await axios.get(`${baseURL}/coderooms/user/${userId}`);
    return response.data;
}

// Get a code Room
const getCodeRoom = async (id) => {
    const response = await axios.get(`${baseURL}/coderooms/${id}`);
    return response.data;
}

// update the code room
const updateCodeRoom = async (id, data) => {
    const response = await axios.put(`${baseURL}/coderooms/${id}`, data);
    return response.data;
}

// delete the code room
const deleteCodeRoom = async (id) => {
    const response = await axios.delete(`${baseURL}/coderooms/${id}`);
    return response.data;
}

// create a code room
const createCodeRoom = async (id) => {
    const response = await axios.post(`${baseURL}/coderooms`, { id });
    return response.data;
}

export { getUserCodeRooms, getCodeRoom, updateCodeRoom, deleteCodeRoom, createCodeRoom };