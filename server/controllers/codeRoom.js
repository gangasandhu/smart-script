import { Router } from 'express';
import db from '../db/db.js';

const codeRoomRouter = Router();

codeRoomRouter.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM coderooms');
        const codes = result.rows;
        res.status(200).json(codes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Get all code rooms where user collaborated
codeRoomRouter.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await db.query('SELECT coderooms.id, coderooms.content, coderooms.language FROM coderooms JOIN room_collaborators ON coderooms.id = room_collaborators.room_id WHERE room_collaborators.user_id = $1', [user_id]);
        const codes = result.rows;
        res.status(200).json(codes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

codeRoomRouter.post('/', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db.query('INSERT INTO coderooms (id) VALUES ($1) RETURNING *', [id]);
        const code = result.rows[0];
        res.status(201).json(code);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

codeRoomRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM coderooms WHERE id = $1', [id]);
        const code = result.rows[0];
        if (!code) {
            return res.status(404).json({ error: 'Code Room not found' });
        }
        res.status(200).json(code);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

codeRoomRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, language } = req.body;
    try {
        const result = await db.query('UPDATE coderooms SET content = $1, language = $2 WHERE id = $3 RETURNING *', [content, language, id]);
        const code = result.rows[0];
        if (!code) {
            return res.status(404).json({ error: 'Code Room not found' });
        }
        res.status(200).json(code);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

codeRoomRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM coderooms WHERE id = $1 RETURNING *', [id]);
        const code = result.rows[0];
        if (!code) {
            return res.status(404).json({ error: 'Code Room not found' });
        }
        res.status(200).json(code);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default codeRoomRouter;