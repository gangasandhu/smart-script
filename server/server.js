import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { setupSocket } from './socket.js';
import userRouter from './controllers/user.js';
import authRouter from './controllers/auth.js';
import codeRoomRouter from './controllers/codeRoom.js';
import roomUserRouter from './controllers/roomUser.js';

const app = express();
const server = createServer(app);

setupSocket(server);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/codeRooms', codeRoomRouter);
app.use('/room-users', roomUserRouter);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);