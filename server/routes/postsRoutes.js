import express from 'express';
import {
    getAllPosts,
    getPostById,
    getPostsByUserId,
    createPost,
    updatePost,
    deletePost
} from '../models/postsModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await getPostsByUserId(req.params.userId);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await createPost(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await updatePost(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deletePost(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;