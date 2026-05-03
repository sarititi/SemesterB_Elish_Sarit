import express from 'express';
import {
    getAllTodos,
    getTodoById,
    getTodosByUserId,
    createTodo,
    updateTodo,
    deleteTodo
} from '../models/todosModel.js';

const router = express.Router();


// =======================
// GET all todos
// =======================
router.get('/', async (req, res) => {
    try {
        const todos = await getAllTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =======================
// GET todo by id
// =======================
router.get('/:id', async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =======================
// GET todos by user_id
// /todos/user/1
// =======================
router.get('/user/:userId', async (req, res) => {
    try {
        const todos = await getTodosByUserId(req.params.userId);
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =======================
// CREATE todo
// =======================
router.post('/', async (req, res) => {
    try {
        const { userId, title, completed } = req.body;

        const result = await createTodo(
            userId,
            title,
            completed ?? false
        );

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =======================
// UPDATE todo
// =======================
router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;

        const result = await updateTodo(
            req.params.id,
            title,
            completed
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =======================
// DELETE todo
// =======================
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteTodo(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;