import db from '../config/db.js';

// GET all users
export const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// GET user by id
export const getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// CREATE user
export const createUser = async (username, email) => {
    const [result] = await db.query(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        [username, email]
    );
    return result;
};

// UPDATE user
export const updateUser = async (id, username, email) => {
    const [result] = await db.query(
        'UPDATE users SET username = ?, email = ? WHERE id = ?',
        [username, email, id]
    );
    return result;
};

// DELETE user
export const deleteUser = async (id) => {
    const [result] = await db.query(
        'DELETE FROM users WHERE id = ?',
        [id]
    );
    return result;
};