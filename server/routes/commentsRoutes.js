import express from 'express';
import {
    getAllComments,
    getCommentById,
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment
} from '../models/commentsModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await getCommentsByPostId(req.params.postId);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await getCommentById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await createComment(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await updateComment(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteComment(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;