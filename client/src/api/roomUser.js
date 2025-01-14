import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// get all roomUsers

const getRoomUsers = async (room_id) => {
    const response = await axios.get(`${baseURL}/room-users/${room_id}`);
    return response.data;
}


// create a new roomUser
const createRoomUser = async (room_id, user_id) => {
        const checkUser = await axios.get(`${baseURL}/room-users/${room_id}/${user_id}`);
        if (checkUser.data) {
            return "User already in room";
        }
        const response = await axios.post(`${baseURL}/room-users`, { room_id, user_id });
        return response.data;
}

export { getRoomUsers, createRoomUser };