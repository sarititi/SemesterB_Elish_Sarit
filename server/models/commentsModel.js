import db from '../config/db.js';

export const getAllComments = async () => {
    const [rows] = await db.query('SELECT * FROM comments');
    return rows;
};

export const getCommentById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM comments WHERE id = ?',
        [id]
    );

    return rows[0];
};

export const getCommentsByPostId = async (postId) => {
    const [rows] = await db.query(
        'SELECT * FROM comments WHERE post_id = ?',
        [postId]
    );

    return rows;
};

//יצירת תגובה (POST)
export const createComment = async (comment) => {
    const { post_id, user_id, body } = comment;

    const [result] = await db.query(
        'INSERT INTO comments (post_id, user_id, body) VALUES (?, ?, ?)',
        [post_id, user_id, body]
    );

    return {
        id: result.insertId,
        post_id,
        user_id,
        body
    };
};

export const updateComment = async (id, comment) => {
    const { body } = comment;

    const [result] = await db.query(
        'UPDATE comments SET body = ? WHERE id = ?',
        [body, id]
    );

    return result;
};

export const deleteComment = async (id) => {
    const [result] = await db.query(
        'DELETE FROM comments WHERE id = ?',
        [id]
    );

    return result;
};