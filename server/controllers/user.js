import dotenv from 'dotenv/config'
import db from '../db/db.js';
import { Router } from 'express';


const userRouter = Router();


// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email FROM users');
    const users = result.rows;

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);

// Create a new user
userRouter.post('/', async (req, res) => {
  const { username, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users (username, email ) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    const user = result.rows[0];

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get a single user by id
userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);

// Update a user
userRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email',
      [username, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = result.rows[0];

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);



export default userRouter;