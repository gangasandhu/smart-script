import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../db/db.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const user = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert user into db
        const result = await db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );
        const userRegistered = result.rows[0];
        const token = jwt.sign({ id: userRegistered.id }, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.status(201).json({token, userRegistered});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);

authRouter.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        // Check if user exists
        const userData = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (userData.rows.length === 0) {
            return res.status(400).json({ error: "User does not exist" });
        }
        // Check if password is correct
        if (!(await bcrypt.compare(password, userData.rows[0].password))) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        const user = userData.rows[0];
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: "24h"});
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);

export default authRouter;