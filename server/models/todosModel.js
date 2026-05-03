import db from '../config/db.js';

// GET all todos
export const getAllTodos = async () => {
    const [rows] = await db.query('SELECT * FROM todos');
    return rows;
};

// GET todo by id
export const getTodoById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM todos WHERE id = ?',
        [id]
    );
    return rows[0];
};

// GET todos by user_id
export const getTodosByUserId = async (userId) => {
    const [rows] = await db.query(
        'SELECT * FROM todos WHERE user_id = ? ORDER BY id',
        [userId]
    );
    return rows;
};

// CREATE todo
export const createTodo = async (userId, title, completed) => {
    const [result] = await db.query(
        'INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)',
        [userId, title, completed]
    );
    return result;
};

// UPDATE todo
export const updateTodo = async (id, title, completed) => {
    const [result] = await db.query(
        'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
        [title, completed, id]
    );
    return result;
};

// DELETE todo
export const deleteTodo = async (id) => {
    const [result] = await db.query(
        'DELETE FROM todos WHERE id = ?',
        [id]
    );
    return result;
};