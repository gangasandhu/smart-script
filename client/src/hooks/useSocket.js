import { useContext } from "react";
import SocketContext from "../context/SocketContext";

const useSocket = () => {
    const socket = useContext(SocketContext);

    const sendUser = (user) => {
        socket.emit("user", user);
    }

    const joinRoom = (roomId, userId) => {
        socket.emit("join room", roomId, userId);
    };

    const getRoomUsers = (cb) => {
        socket.on("room users", cb);

    }

    const sendText = (text, roomId) => {
        socket.emit("text", text, roomId);
    }

    const getText = (cb) => {
        socket.on("text", cb);
    }

    const sendLanguage = (language, roomId) => {
        socket.emit("language", language, roomId);
    }

    const getLanguage = (cb) => {
        socket.on("language", cb);
    }

    return { socket, sendUser, joinRoom, getRoomUsers, sendText, getText, sendLanguage, getLanguage };
}

export default useSocket;