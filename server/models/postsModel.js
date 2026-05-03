import db from '../config/db.js';

export const getAllPosts = async () => {
    const [rows] = await db.query('SELECT * FROM posts');
    return rows;
};

// ❗ שינוי כאן
export const getPostById = async (postId) => {
    const [rows] = await db.query(
        'SELECT * FROM posts WHERE post_id = ?',
        [postId]
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
        post_id: result.insertId, // ❗ שינוי
        user_id,
        title,
        body
    };
};

// ❗ שינוי כאן
export const updatePost = async (postId, post) => {
    const { title, body } = post;

    const [result] = await db.query(
        'UPDATE posts SET title = ?, body = ? WHERE post_id = ?',
        [title, body, postId]
    );

    return result;
};

// ❗ שינוי כאן
export const deletePost = async (postId) => {
    const [result] = await db.query(
        'DELETE FROM posts WHERE post_id = ?',
        [postId]
    );

    return result;
};