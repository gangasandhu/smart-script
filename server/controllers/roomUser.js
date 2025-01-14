import { Router } from "express";
import db from "../db/db.js";

const roomUserRouter = Router();

// Get all roomUsers
roomUserRouter.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM room_collaborators");
    const roomUsers = result.rows;

    res.json(roomUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new roomUser
roomUserRouter.post("/", async (req, res) => {
  const { room_id, user_id } = req.body;
  try {
    const {rows} = await db.query("SELECT * FROM room_collaborators WHERE room_id = $1 AND user_id = $2", [room_id, user_id]);
    if (rows.length > 0) {
        return res.status(400).json({ error: "User already in room" });
    }
    const result = await db.query(
      "INSERT INTO room_collaborators (room_id, user_id) VALUES ($1, $2) RETURNING *",
      [room_id, user_id]
    );
    const roomUser = result.rows[0];

    res.status(201).json(roomUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all the users in a room
roomUserRouter.get("/:room_id", async (req, res) => {
    const { room_id } = req.params;
    try {
        const result = await db.query(
        "SELECT users.id, users.username, users.email FROM users JOIN room_collaborators ON users.id = room_collaborators.user_id WHERE room_collaborators.room_id = $1",
        [room_id]
        );
        const users = result.rows;
    
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
);

// Check if a user is in a room
roomUserRouter.get("/:room_id/:user_id", async (req, res) => {
    const { room_id, user_id } = req.params;
    try {
        const result = await db.query(
        "SELECT * FROM room_collaborators WHERE room_id = $1 AND user_id = $2",
        [room_id, user_id]
        );
        const roomUser = result.rows[0];
    
        res.json(roomUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
);

export default roomUserRouter;