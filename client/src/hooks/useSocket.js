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
        console.log("text sent", text, roomId)

        socket.emit("text", text, roomId);
    }

    const getText = (cb) => {
        socket.on("text", cb);
    }

    return { socket, sendUser, joinRoom, getRoomUsers, sendText, getText };
}

export default useSocket;