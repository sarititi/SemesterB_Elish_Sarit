import db from '../config/db.js';

// GET all users
export const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// GET user by id
export const getUserById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};

// GET user by username (ללוגין)
export const getUserByUsername = async (username) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
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

// GET password by user_id (ללוגין)
export const getPasswordByUserId = async (userId) => {
    const [rows] = await db.query(
        'SELECT password FROM passwords WHERE user_id = ?',
        [userId]
    );
    return rows[0];
};

// CREATE password (אם תרצי הרשמה מלאה)
export const createPassword = async (userId, password) => {
    const [result] = await db.query(
        'INSERT INTO passwords (user_id, password) VALUES (?, ?)',
        [userId, password]
    );
    return result;
};