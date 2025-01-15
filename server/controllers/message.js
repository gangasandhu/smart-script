import {Router} from "express";
import db from "../db/db.js";

const messageRouter = Router();

// Get all messages in a room

messageRouter.get("/:room_id", async (req, res) => {
    const {room_id} = req.params;
    try {
        const result = await db.query(
            "SELECT messages.id, messages.content, messages.user_id, users.username, users.email FROM messages JOIN users ON messages.user_id = users.id WHERE messages.room_id = $1",
            [room_id]
        );
        const messages = result.rows;

        res.json(messages);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Create a new message
messageRouter.post("/", async (req, res) => {
    const {room_id, user_id, content} = req.body;
    try {
        const result = await db.query(
            "INSERT INTO messages (room_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
            [room_id, user_id, content]
        );
        const message = result.rows[0];

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default messageRouter;