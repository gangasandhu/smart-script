import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { setupSocket } from './socket.js';


const app = express();
const server = createServer(app);

setupSocket(server);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);