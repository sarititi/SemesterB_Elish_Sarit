import db from '../config/db.js';

export const getAllPosts = async () => {
    const [rows] = await db.query('SELECT * FROM posts');
    return rows;
};
console.log(await getAllPosts());

export const getPostById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM posts WHERE id = ?',
        [id]
    );

    return rows[0];
};

export const getPostsByUserId = async (userId) => {
    const [rows] = await db.query(
        'SELECT * FROM posts WHERE user_id = ?',
        [userId]
    );

    return rows;
};

export const createPost = async (post) => {
    const { user_id, title, body } = post;

    const [result] = await db.query(
        'INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)',
        [user_id, title, body]
    );

    return {
        id: result.insertId,
        user_id,
        title,
        body
    };
};

export const updatePost = async (id, post) => {
    const { title, body } = post;

    const [result] = await db.query(
        'UPDATE posts SET title = ?, body = ? WHERE id = ?',
        [title, body, id]
    );

    return result;
};

export const deletePost = async (id) => {
    const [result] = await db.query(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );

    return result;
};