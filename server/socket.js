// socket.js
import { Server } from "socket.io";

export const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    const userSockets = {};// { userId: { username, id, socketId } }
    const roomUsers = {};// { roomId: Set(userIds) 
    const roomData = {};// { roomId: { text } }

    io.on("connection", (socket) => {
        console.log("connected", socket.id);

        socket.on("user", (user) => {
            console.log("user connected", user.username);

            userSockets[user.id] = {...user, socketId: socket.id};
            console.log("userSockets", userSockets);
        });

        socket.on("join room", (roomId, userId) => {
            socket.join(roomId);
            console.log(socket.id, "joined", roomId);
            roomUsers[roomId] = roomUsers[roomId] ? roomUsers[roomId].add(userId) : new Set([userId]);
            const usersInRoom = Array.from(roomUsers[roomId]).map(userId => userSockets[userId]);
            io.to(roomId).emit("room users", usersInRoom);
            console.log("users in room", usersInRoom);
            if (roomData[roomId]) {
                socket.emit("text", roomData[roomId]);
            }
        });

        socket.on("text", (text, roomId) => {
            roomData[roomId] = text;
            io.to(roomId).emit("text", text);
        });

        socket.on("disconnect", () => {
            let disconnectedUser = null;
      
            // Find and remove user from userSockets
            for (const userId in userSockets) {
              if (userSockets[userId].socketId === socket.id) {
                disconnectedUser = +userId;
                delete userSockets[userId];
                console.log("User disconnected:", userId);
                break;
              }
            }
      
            // Remove user from any rooms they were part of
            if (disconnectedUser) {
              for (const roomId in roomUsers) {
                if (roomUsers[roomId].has(disconnectedUser)) {
                  roomUsers[roomId].delete(disconnectedUser);
                  // Broadcast updated user list
                  const usersInRoom = Array.from(roomUsers[roomId]).map((id) => userSockets[id]);
                  io.to(roomId).emit("room users", usersInRoom);

                  if (roomUsers[roomId].size === 0) {
                    delete roomUsers[roomId];
                    delete roomData[roomId];
                  }
                }
              }
            }
          });

    });

    return io;
};
