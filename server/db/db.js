import dotenv from 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

db.connect().then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database', err);
});

db.query(`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    )`
);

db.query(`
    CREATE TABLE IF NOT EXISTS coderooms (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Untitled', 
    content TEXT DEFAULT '',  
    language VARCHAR(50) DEFAULT 'javascript',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`
);

db.query(`
    CREATE TABLE IF NOT EXISTS room_collaborators (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255) REFERENCES coderooms (id) ON DELETE CASCADE,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(room_id, user_id)
    )
`);

db.query(`
    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255) REFERENCES coderooms (id) ON DELETE CASCADE,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    )
`);

export default db;